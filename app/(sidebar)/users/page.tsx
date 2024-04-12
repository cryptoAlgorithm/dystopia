import {
  Container, IconButton, List, ListDivider, ListItem, ListItemContent, ListItemDecorator, Sheet, Typography,
} from "@mui/joy";
import {getCookieSession} from '@/util/session/sessionManager'
import {redirect} from 'next/navigation'
import {WithId} from 'mongodb'
import {IBaseUser, IUser} from '@/data/IUser'
import mongodb from '@/lib/mongodb'
import {CreateBotItem} from '@/app/(sidebar)/users/_components/CreateBotItem'
import {BotItem} from '@/app/(sidebar)/users/_components/BotItem'
import {addBotUser, generateBotToken} from '@/app/(sidebar)/users/actions'
import {Fragment} from 'react'

const getBotUsers = async (): Promise<WithId<IBaseUser>[]> => {
  const col = (await mongodb).db().collection<IUser>('users')
  return col
    .find({ type: 'bot' })
    .project<WithId<IBaseUser>>({ _id: 1, username: 1 })
    .toArray()
}

export type SummarisedUser = { id: string, username: string }

export default async function Users() {
  const session = getCookieSession()
  if (!session) redirect('/login')
  const users = await getBotUsers()

  return <Container maxWidth={'sm'} sx={{ py: 2 }}>
    <Typography level={'h2'} gutterBottom>Get your tokens here!</Typography>

    <Sheet variant={'soft'} sx={{ borderRadius: 'md' }}>
      <Typography level={'title-lg'} mx={1.5} pt={1}>Bot Users</Typography>

      <List>
        {users
          .map(u => ({ id: u._id.toHexString(), username: u.username }))
          .map(user => <Fragment key={user.id}>
            <BotItem user={user} getToken={generateBotToken} />
            <ListDivider inset={'gutter'} />
          </Fragment>
        )}
        <CreateBotItem onCreate={addBotUser} />
      </List>
    </Sheet>
  </Container>
}
