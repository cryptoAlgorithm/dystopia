import {
  Button,
  Container, Input, Typography,
} from "@mui/joy";
import {getCookieSession} from '@/util/session/sessionManager'
import {redirect} from 'next/navigation'

export default async function User({ params }: { params: { id: string } }) {
  if (params.id == 'me') {
    console.log('its me!')
  }


  return <Container maxWidth={'sm'} sx={{ py: 2 }}>
    <Typography level={'h2'} gutterBottom>Hello, {params.id}</Typography>

    <Input size={'lg'} endDecorator={<Button>Generate Bot Token</Button>} placeholder={'ID'}></Input>
  </Container>
}
