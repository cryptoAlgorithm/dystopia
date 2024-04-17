import {
  Box,
  Container,
  Stack, Typography,
} from "@mui/joy";
import PostCard from "@/components/post/PostCard";
import {getPosts} from '@/data/postActions'
import PostRounded from '@mui-symbols-material/w400/PostRounded'

const BottomPlaceholder = () => <Box textAlign={'center'} pt={2}>
  <Typography level={'h1'}><PostRounded /></Typography>
  <Typography level={'title-lg'}>No more posts</Typography>
  <Typography level={'body-sm'}>
    Looks like you&apos;ve seen all the posts there are. Congratulations!
  </Typography>
</Box>

export default async function Home() {
  const posts = await getPosts()
  // console.log(posts)
  return <Container maxWidth={'sm'}>
    <Stack my={2} spacing={2} pb={4}>
      { posts.map(post => <PostCard post={post} key={post._id.toString()} />) }
      <BottomPlaceholder />
    </Stack>
  </Container>
}
