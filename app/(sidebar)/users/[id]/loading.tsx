import {Container, Skeleton} from '@mui/joy'
import {Card, CardContent, Stack} from '@mui/material'

export default function Loading() {
  return <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} py={{ xs: 2, sm: 3 }} px={{ xs: 2, sm: 3 }}>
    <Stack width={{ xs: '100%', md: 360 }} alignSelf={'flex-start'} position={'sticky'} top={70}>
      <Card variant={'soft'} sx={{ borderRadius: 'lg' }}>
        <CardContent>
          <Skeleton level={'h3'} variant={'text'} width={'80%'} />
          <Skeleton variant={'text'} width={'90%'} />
        </CardContent>
      </Card>
    </Stack>
    <Container maxWidth={'md'} disableGutters>
      <Skeleton variant={'text'} level={'body-xs'} width={100} />
      <Skeleton variant={'text'} level={'title-lg'} width={'39%'} />
    </Container>
  </Stack>
}