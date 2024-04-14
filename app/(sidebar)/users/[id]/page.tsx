import {
  Container, Typography,
} from "@mui/joy";
import {getCookieSession} from '@/util/session/sessionManager'
import {redirect} from 'next/navigation'

export default async function User({ params }: { params: { id: string } }) {
  let id: string
  if (params.id === 'me') {
    const session = getCookieSession()
    if (!session) redirect('/login?to=/users/me')
    id = session.id
  } else {
    id = params.id
  }

  return <Container maxWidth={'sm'} sx={{ py: 2 }}>
    <Typography level={'h2'} gutterBottom>Hello, { id }</Typography>
  </Container>
}
