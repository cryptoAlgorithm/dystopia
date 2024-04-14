import {
  Box,
  Container,
  Typography,
} from "@mui/joy";
import {getCookieSession} from '@/util/session/sessionManager'
import {redirect} from 'next/navigation'
import {PostComposer} from '@/components/post/PostComposer'

export default async function Post() {
  const session = getCookieSession()
  if (!session) redirect('/login?to=post')

  return <Container maxWidth={'md'} sx={{ m: 0 }}>
    <Box my={2}>
      <Typography level={'h2'} gutterBottom>Create Post</Typography>
      <PostComposer />
      <Typography level={'body-sm'} mt={1}>You&apos;re posting as <b>{session.u}</b></Typography>
    </Box>
  </Container>
}
