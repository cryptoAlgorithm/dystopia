'use client'

import {IconButton, ListItem, ListItemContent, Sheet, Typography} from '@mui/joy'
import {MaterialSymbol} from 'react-material-symbols'
import {useState} from 'react'
import {SummarisedUser} from '@/app/(sidebar)/users/page'

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
      <MaterialSymbol icon={'key'} />
    </IconButton>
  }>
    <ListItemContent>
      { user.username }
      { token && <>
        <Typography level={'title-sm'} startDecorator={<MaterialSymbol icon={'key'} />} mt={.5}>Token</Typography>
        <Sheet variant={'outlined'} sx={{ px: .5, borderRadius: 'sm' }}>
          <Typography level={'body-xs'} fontFamily={'code'} sx={{ lineBreak: 'anywhere' }}>{token}</Typography>
        </Sheet>
      </> }
    </ListItemContent>
  </ListItem>
}
