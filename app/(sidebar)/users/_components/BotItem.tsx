'use client'

import {IconButton, Link, ListItem, ListItemContent, Sheet, Typography} from '@mui/joy'
import {useState} from 'react'
import {SummarisedUser} from '@/app/(sidebar)/users/page'
import KeyRounded from '@mui-symbols-material/w400/KeyRounded'
import NextLink from 'next/link'

export const BotItem = ({ user, getToken }: { user: SummarisedUser, getToken: (id: string) => Promise<string> }) => {
  const [token, setToken] = useState<string | null>(null)
  const [fetching, setFetching] = useState(false)

  return <ListItem endAction={
    !token && <IconButton
      variant={'soft'} loading={fetching}
      onClick={() => {
        setFetching(true)
        getToken(user.id)
          .then(token => {
            setToken(token)
          })
          .finally(() => setFetching(false))
      }
    }>
      <KeyRounded />
    </IconButton>
  }>
    <ListItemContent>
      <Typography>
        <Link component={NextLink} href={`/users/${user.id}`}>{ user.username }</Link> <Typography level={'body-xs'} fontFamily={'code'}>{user.id}</Typography>
      </Typography>
      { token && <>
        <Typography level={'title-sm'} startDecorator={<KeyRounded />} mt={.5}>Token</Typography>
        <Sheet variant={'outlined'} sx={{ px: .5, borderRadius: 'sm' }}>
          <Typography level={'body-xs'} fontFamily={'code'} sx={{ lineBreak: 'anywhere' }}>{token}</Typography>
        </Sheet>
      </> }
    </ListItemContent>
  </ListItem>
}
