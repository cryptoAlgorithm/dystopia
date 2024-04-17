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

export default async function Post({ params }: { params: { id: string } }) {
  if (!ObjectId.isValid(params.id)) notFound() // Make sure ObjectId creation doesn't explode if an invalid id is supplied
  const comments = await getComments(params.id)
  const post = await getPost(params.id)
  if (!post) notFound()

  return <Container maxWidth={'md'}>
    <Stack spacing={2} mt={{ xs: 2, sm: 3 }} mb={6}>
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
            overflow={'hidden'} position={'relative'} paddingBottom={'min(100%, 540px)'}
            display={'flex'} justifyContent={'center'}
            borderRadius={'sm'} mt={2}
          >
            <Image src={post.imageURL} fill alt={''} unoptimized style={{ filter: 'blur(24px)', opacity: .5, transform: 'scale(1.1)', objectFit: 'cover' }} />
            <Box sx={{
              backgroundImage: `url(${post.imageURL})`,
              backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'contain',
              position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, zIndex: 10
            }} />
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
