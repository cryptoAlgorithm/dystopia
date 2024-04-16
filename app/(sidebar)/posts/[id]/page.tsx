import {Box, Card, CardContent, Container, Divider, Link, Stack, Typography} from "@mui/joy";
import {getComments} from "@/data/commentActions";
import {ObjectId} from "bson";
import {notFound} from "next/navigation";
import {getPost} from "@/data/postActions";
import {Voter} from '@/components/post/Voter'
import {CommentComposer} from '@/app/(sidebar)/posts/[id]/_components/CommentComposer'
import {Comment} from '@/components/post/Comment'
import {CommentsViewChip} from '@/app/(sidebar)/posts/[id]/_components/CommentsViewChip'
import {updateVote} from '@/data/voteActions'
import NextLink from 'next/link'
import {formatDistanceToNow} from 'date-fns'
import Image from 'next/image'
import passthroughLoader from '@/util/passthroughLoader'

export default async function Post({ params }: { params: { id: string } }) {
  if (!ObjectId.isValid(params.id)) notFound() // Make sure ObjectId creation doesn't explode if an invalid id is supplied
  const comments = await getComments(params.id)
  const post = await getPost(params.id)
  if (!post) notFound()

  return <Container maxWidth={'md'}>
    <Stack spacing={2} mt={3} mb={6}>
      <Card variant={'soft'} sx={{ borderRadius: 'lg' }}>
        <CardContent>
          <Typography level={'title-md'}>
            <Link component={NextLink} href={`/users/${post.user.toHexString()}`} textColor={'inherit'}>{ post.username }</Link>
            <Typography textColor={'text.secondary'} component={'span'}>
              &nbsp;&bull; {formatDistanceToNow(post.at, { addSuffix: true })}
            </Typography>
          </Typography>
          <Typography level={'h1'}>{ post.title }</Typography>
          <Typography textColor={'text.secondary'} whiteSpace={'pre-wrap'}>{ post.content }</Typography>
          { post.imageURL && <Box
              overflow={'hidden'} maxHeight={540} position={'relative'}
              display={'flex'} justifyContent={'center'}
              borderRadius={'sm'} mt={2}
          >
            <Image src={post.imageURL} fill alt={''} loader={passthroughLoader} style={{ filter: 'blur(24px)', opacity: .5, transform: 'scale(1.1)', objectFit: 'cover' }} />
            <Image src={post.imageURL} width={1024} height={1024} alt={''} loader={passthroughLoader} style={{ width: 'auto', height: '100%', zIndex: 10 }} />
          </Box> }
        </CardContent>
      </Card>
      <Stack direction={'row'} spacing={2}>
        <Voter vote={updateVote} voteDelta={post.userVote ?? 0} count={post.voteCount} id={post._id.toHexString()} />
        <CommentsViewChip numComments={comments.length} />
      </Stack>

      <Divider />

      <Typography level={'title-md'} id={'comments'}>Comments</Typography>
      <CommentComposer postID={post._id.toHexString()} />
      { comments.map(c => <Comment key={c._id.toString()} comment={c} />) }
      { comments.length == 0 && <Typography textColor={'text.tertiary'} textAlign={'center'}>No Comments</Typography> }
    </Stack>
  </Container>
}
