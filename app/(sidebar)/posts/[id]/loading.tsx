import {Container, Skeleton} from '@mui/joy'
import {Box, Card, CardContent, Divider, Stack, Typography} from '@mui/material'

export default function Loading() {
  return <Container maxWidth={'md'}>
    <Stack spacing={2} mt={{ xs: 2, sm: 3 }} mb={6}>
      <Card variant={'soft'} sx={{ borderRadius: 'lg' }}>
        <CardContent>
          <Skeleton variant={'text'} level={'title-md'} width={'20%'} />
          <Skeleton variant={'text'} level={'h1'} width={'49%'} />
          <Skeleton variant={'text'} width={'79%'} />
          <Skeleton variant={'text'} width={'90%'} />
          <Skeleton variant={'text'} width={'67%'} />
        </CardContent>
      </Card>

      <Divider />

      <Typography level={'title-md'} id={'comments'}>Comments</Typography>
      <Box>
        <Skeleton variant={'text'} level={'title-sm'} width={'15%'} />
        <Skeleton variant={'text'} width={'70%'} />
      </Box>
    </Stack>
  </Container>
}