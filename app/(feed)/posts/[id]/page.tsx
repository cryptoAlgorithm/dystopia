import {Card, CardContent, Container, Divider, Stack, Typography} from "@mui/joy";
import {getComments} from "@/data/comment";
import {ObjectId} from "bson";
import {notFound} from "next/navigation";
import {getPost} from "@/data/post";

export default async function Post({ params }: { params: { id: string } }) {
  if (!ObjectId.isValid(params.id)) notFound() // Make sure ObjectId creation doesn't explode if an invalid id is supplied
  const comments = await getComments(params.id)
  const post = await getPost(params.id)
  if (!post) notFound()
  return <Container maxWidth={'md'}>
    <Stack spacing={2} my={2}>
      <Card variant={'soft'}>
        <CardContent>
          <Typography level={'h1'}>{ post.title }</Typography>
          <Typography textColor={'text.secondary'}>{ post.content }</Typography>
        </CardContent>
      </Card>
      <Divider />
      <Typography level={'title-md'}>Comments</Typography>
      { comments.map(c => <Typography key={c._id.toString()}>{c.content}</Typography>) }
      { comments.length == 0 && <Typography textColor={'text.tertiary'} textAlign={'center'}>No Comments</Typography> }
    </Stack>
  </Container>
}
