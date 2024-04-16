import {
  Card, CardContent,
  Container, Stack, Typography,
} from "@mui/joy";
import {getCookieSession} from '@/util/session/sessionManager'
import {notFound, redirect} from 'next/navigation'
import mongodb from '@/lib/mongodb'
import {IUser} from '@/data/IUser'
import {ObjectId} from 'bson'
import {cache} from 'react'
import Robot_2Rounded from '@mui-symbols-material/w400/Robot_2Rounded'
import {getPosts} from '@/data/postActions'
import PostCard from '@/components/post/PostCard'

const getUser = cache(async (id: string) => {
  const col = (await mongodb).db().collection<IUser>('users')
  return col.findOne({ _id: new ObjectId(id) }, { projection: { password: 0 } })
})

export default async function User({ params }: { params: { id: string } }) {
  let id: string
  if (params.id === 'me') {
    const session = getCookieSession()
    if (!session) redirect('/login?to=/users/me')
    id = session.id
  } else {
    if (!ObjectId.isValid(params.id)) notFound()
    id = params.id
  }

  const user = await getUser(id)
  if (!user) notFound()

  const userPosts = await getPosts(null, null, id)

  return <Stack direction={'row'} py={2} pl={3}>
    <Stack width={300} position={'sticky'} top={0}>
      <Card variant={'soft'}>
        <CardContent>
          <Typography level={'h2'} endDecorator={user.type == 'bot' ? <Robot_2Rounded /> : undefined}>{ user.username }</Typography>
          <Typography fontFamily={'code'}>{ id }</Typography>
        </CardContent>
      </Card>
      { user.type == 'bot' && <>
          <Typography level={'title-lg'} mt={2} gutterBottom>Personality</Typography>
          <Typography>{ user.persona ?? 'Not populated' }</Typography>
      </> }
    </Stack>
    <Container maxWidth={'md'}>
      <Stack spacing={2}>
        { userPosts.map(post => <PostCard post={post} key={post._id.toString()} />) }
      </Stack>
    </Container>
  </Stack>
}
