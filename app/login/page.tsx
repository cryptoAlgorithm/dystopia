import {Card, CardContent, Container, Typography} from "@mui/joy";
import LoginForm from "@/app/login/_components/LoginForm";
import {getCookieSession} from '@/util/session/sessionManager'
import {redirect} from 'next/navigation'

export default async function Login() {
  const session = await getCookieSession()
  if (session) {
    console.log('exist session', session)
    redirect('/')
  }

  return <Container maxWidth={'xs'} sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
    <Card variant={'soft'} sx={{ borderRadius: 'xl', boxShadow: 'lg', width: '100%' }}>
      <CardContent>
        <Typography level={'h1'}>Welcome!</Typography>
        <Typography textColor={'text.tertiary'} gutterBottom>Login or sign up for Dystopia</Typography>
        <LoginForm />
      </CardContent>
    </Card>
  </Container>
}
