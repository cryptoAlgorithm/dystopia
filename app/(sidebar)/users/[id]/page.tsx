import {
  Card, CardContent,
  Container, Link, Stack, Tab, TabList, TabPanel, Tabs, Typography,
} from "@mui/joy";
import {getCookieSession} from '@/util/session/sessionManager'
import {notFound, redirect} from 'next/navigation'
import mongodb from '@/lib/mongodb'
import {IUser} from '@/data/IUser'
import {ObjectId} from 'bson'
import {cache} from 'react'
import Robot_2Rounded from '@mui-symbols-material/w400/Robot_2Rounded'
import {getPosts} from '@/data/postActions'
import PostCard from '@/components/post/PostCard'
import {IVote} from '@/data/IVote'
import {IComment} from '@/data/IComment'
import {WithId} from 'mongodb'
import NextLink from 'next/link'
import ArrowUpwardFilledRounded from '@mui-symbols-material/w400/ArrowUpwardFilledRounded'
import ArrowDownwardFilledRounded from '@mui-symbols-material/w400/ArrowDownwardFilledRounded'
import {formatDistanceToNow} from 'date-fns'
import PostRounded from '@mui-symbols-material/w400/PostRounded'
import CommentRounded from '@mui-symbols-material/w400/CommentRounded'
import ThumbsUpDownRounded from '@mui-symbols-material/w400/ThumbsUpDownRounded'

const getUser = cache(async (id: string) => {
  const col = (await mongodb).db().collection<IUser>('users')
  return col.findOne({ _id: new ObjectId(id) }, { projection: { password: 0 } })
})

type UserInfoVote = Omit<WithId<IVote>, 'user'> & { postTitle: string }

const getUserVotes = cache(async (id: string) => {
  const col = (await mongodb).db().collection<IVote>('votes')
  return col
    .aggregate<UserInfoVote>([{
      $match: { user: new ObjectId(id) }
    }, {
      $lookup: {
        from: 'posts',
        localField: 'for',
        foreignField: '_id',
        as: 'posts'
      }
    }, {
      $unwind: '$posts',
    }, {
      $project: { _id: 1, delta: 1, for: 1, postTitle: '$posts.title' }
    }])
    .toArray()
})

type UserInfoComment = Omit<WithId<IComment>, 'user'> & { postTitle: string }

const getUserComments = cache(async (id: string) => {
  const col = (await mongodb).db().collection<IComment>('comments')
  return col
    .aggregate<UserInfoComment>([{
      $match: {
        user: ObjectId.createFromHexString(id)
      }
    }, {
      $lookup: {
        from: 'posts',
        localField: 'parent',
        foreignField: '_id',
        as: 'posts'
      }
    }, {
      $unwind: '$posts'
    }, {
      $sort: {
        at: -1
      }
    }, {
      $project: { _id: 1, parent: 1, content: 1, at: 1, postTitle: '$posts.title' }
    }])
    .toArray()
})

const CommentInfo = ({ comment }: { comment: UserInfoComment }) => <Stack direction={'row'} alignItems={'start'}>
  <Stack>
    <Typography level={'title-sm'}>
      <Link component={NextLink} href={`/posts/${comment.parent.toHexString()}`}>
        {comment.postTitle}
      </Link>
      &nbsp;&bull; {formatDistanceToNow(comment.at, { addSuffix: true })}
    </Typography>
    <Typography>{ comment.content }</Typography>
  </Stack>
</Stack>

const VoteInfo = ({ vote }: { vote: UserInfoVote }) => <Stack direction={'row'} spacing={1}>
  <Typography
    color={vote.delta == 1 ? 'success' : 'danger'}
    startDecorator={vote.delta == 1 ? <ArrowUpwardFilledRounded color={'inherit'} /> : <ArrowDownwardFilledRounded color={'inherit'} />}
    level={'title-md'}>
    <Link level={'title-md'} component={NextLink} href={`/posts/${vote.for.toHexString()}`}>{ vote.postTitle }</Link>
  </Typography>
</Stack>

export default async function User({ params }: { params: { id: string } }) {
  let id: string
  if (params.id === 'me') {
    const session = getCookieSession()
    if (!session) redirect('/login?to=/users/me')
    id = session.id
  } else {
    if (!ObjectId.isValid(params.id)) notFound()
    id = params.id
  }

  const user = await getUser(id)
  if (!user) notFound()

  const userPosts = await getPosts(null, null, id)
  const userComments = await getUserComments(id)
  const userVotes = await getUserVotes(id)

  return <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} py={{ xs: 2, sm: 3 }} px={{ xs: 2, sm: 3 }}>
    <Stack width={{ xs: '100%', md: 360 }} alignSelf={'flex-start'} position={'sticky'} top={70}>
      <Card variant={'soft'} sx={{ borderRadius: 'lg' }}>
        <CardContent>
          <Typography level={'h3'} endDecorator={user.type == 'bot' ? <Robot_2Rounded /> : undefined}>{ user.username }</Typography>
          <Typography fontFamily={'code'}>{ id }</Typography>
        </CardContent>
      </Card>
      { user.type == 'bot' && <>
          <Typography level={'title-lg'} mt={2} gutterBottom>Personality</Typography>
          <Typography>{ user.persona ?? 'Not populated' }</Typography>
      </> }
    </Stack>
    <Container maxWidth={'md'} disableGutters>
      <Tabs sx={{ borderRadius: 'lg', overflow: 'hidden' }}>
        <TabList>
          <Tab>Posts</Tab>
          <Tab>Comments</Tab>
          <Tab>Votes</Tab>
        </TabList>
        <TabPanel value={0}>
          <Stack spacing={2}>
            { userPosts.map(post => <PostCard post={post} key={post._id.toHexString()} />) }
            { userPosts.length == 0 && <Stack alignItems={'center'}>
              <Typography level={'h1'}><PostRounded /></Typography>
              <Typography level={'title-lg'}>No posts</Typography>
            </Stack> }
          </Stack>
        </TabPanel>
        <TabPanel value={1}>
          <Stack spacing={2}>
            { userComments.map(comment => <CommentInfo key={comment._id.toHexString()} comment={comment} />) }
            { userComments.length == 0 && <Stack alignItems={'center'}>
                <Typography level={'h1'}><CommentRounded /></Typography>
                <Typography level={'title-lg'}>No comments</Typography>
            </Stack> }
          </Stack>
        </TabPanel>
        <TabPanel value={2}>
          <Stack spacing={2}>
            { userVotes.map(vote => <VoteInfo key={vote._id.toHexString()} vote={vote} />) }
            { userVotes.length == 0 && <Stack alignItems={'center'}>
                <Typography level={'h1'}><ThumbsUpDownRounded /></Typography>
                <Typography level={'title-lg'}>No votes</Typography>
            </Stack> }
          </Stack>
        </TabPanel>
      </Tabs>
    </Container>
  </Stack>
}
