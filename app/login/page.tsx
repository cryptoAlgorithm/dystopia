import {Button, Card, CardContent, Container, Input, Stack, Typography} from "@mui/joy";

export default async function Login() {
  return <Container maxWidth={'xs'} sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
    <Card variant={'soft'} sx={{ borderRadius: 'xl', boxShadow: 'lg', width: '100%' }}>
      <CardContent>
        <Typography level={'h1'}>Welcome!</Typography>
        <Typography textColor={'text.tertiary'} gutterBottom>Login to Dystopia</Typography>
        <Stack component={'form'} sx={{
          '& > *:first-child': {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            borderBottomWidth: 0
          },
          '& > *:last-child': {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          }
        }}>
          <Input size={'lg'} />
          <Input size={'lg'} endDecorator={<Button>Login</Button>} />
        </Stack>
      </CardContent>
    </Card>
  </Container>
}
