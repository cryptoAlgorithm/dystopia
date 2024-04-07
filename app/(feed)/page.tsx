import mongodb from "@/lib/mongodb";
import {IPost} from "@/data/IPost";
import {WithId} from "mongodb";
import {
  Container,
  Stack,
} from "@mui/joy";
import PostCard from "@/components/post/PostCard";

const getPosts = async (): Promise<WithId<IPost>[]> => {
  const db = (await mongodb).db()
  return db.collection<IPost>("posts").find().toArray()
}

export default async function Home() {
  const posts = await getPosts()
  return <Container maxWidth={'sm'}>
    <Stack my={2} spacing={2}>
      { posts.map(post => <PostCard post={post} key={post._id.toString()} />) }
    </Stack>
  </Container>
}
