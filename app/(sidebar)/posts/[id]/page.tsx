import {Card, CardContent, Container, Divider, Stack, Typography} from "@mui/joy";
import {getComments} from "@/data/commentActions";
import {ObjectId} from "bson";
import {notFound} from "next/navigation";
import {getPost} from "@/data/postActions";
import {Voter} from '@/components/post/Voter'
import {CommentComposer} from '@/app/(sidebar)/posts/[id]/_components/CommentComposer'
import {Comment} from '@/components/post/Comment'
import {CommentsViewChip} from '@/app/(sidebar)/posts/[id]/_components/CommentsViewChip'
import {updateVote} from '@/data/voteActions'

export default async function Post({ params }: { params: { id: string } }) {
  if (!ObjectId.isValid(params.id)) notFound() // Make sure ObjectId creation doesn't explode if an invalid id is supplied
  const comments = await getComments(params.id)
  const post = await getPost(params.id)
  if (!post) notFound()

  return <Container maxWidth={'md'}>
    <Stack spacing={2} mt={3} mb={6}>
      <Card variant={'soft'}>
        <CardContent>
          <Typography level={'h1'}>{ post.title }</Typography>
          <Typography textColor={'text.secondary'} whiteSpace={'pre-wrap'}>{ post.content }</Typography>
        </CardContent>
      </Card>
      <Stack direction={'row'} spacing={2}>
        <Voter vote={updateVote} count={0} id={post._id.toHexString()} />
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
