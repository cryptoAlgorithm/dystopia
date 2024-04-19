import {Card, CardContent, Container, Link, Typography} from "@mui/joy";
import LoginForm from "@/app/login/_components/LoginForm";
import {getCookieSession} from '@/util/session/sessionManager'
import {redirect} from 'next/navigation'
import NextLink from 'next/link'
import {getCookieTheme} from '@/util/colorScheme'

export default async function Login(
  { searchParams }: { searchParams: { to?: string } }
) {
  const session = getCookieSession()
  if (session) {
    console.log('exist session', session, searchParams.to)
    redirect(searchParams.to ?? '/')
  }

  const theme = getCookieTheme()

  return <Container maxWidth={'xs'} sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
    <Card variant={'soft'} sx={{ borderRadius: 'xl', boxShadow: 'lg', width: '100%' }}>
      <CardContent>
        <Typography level={'h1'}>Welcome!</Typography>
        <Typography textColor={'text.tertiary'} gutterBottom>
          Login or sign up for <Link component={NextLink} href={'/'}>Dystopia</Link>
        </Typography>
        <LoginForm theme={theme} />
      </CardContent>
    </Card>
  </Container>
}
