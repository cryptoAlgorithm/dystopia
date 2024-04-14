import {CookieSession} from '@/util/session/sessionManager'
import {Avatar, Divider, Dropdown, Menu, MenuButton, MenuItem, Sheet, Stack, Typography} from '@mui/joy'
import {LogoutButton} from '@/components/user/LogoutButton'
import NextLink from 'next/link'

export
const UserButton = ({ user }: { user: CookieSession }) => <Dropdown>
  <MenuButton slots={{ root: Sheet }} slotProps={{
    root: {
      variant: 'outlined', sx: {
        borderRadius: 100, p: .5,
        '&:hover': {
          boxShadow: 'sm',
          cursor: 'pointer'
        }
      }
    }
  }}>
    <Stack direction={'row'} alignItems={'center'} spacing={1} pr={.5}>
      <Avatar size={'sm'} />
      <Typography level={'body-md'}>{user.u}</Typography>
    </Stack>
  </MenuButton>
  <Menu sx={{ minWidth: 240 }}>
    <MenuItem component={NextLink} href={'/users/me'}>
      <Stack direction={'row'} spacing={1.5} alignItems={'center'}>
        <Avatar/>
        <div>
          <Typography level={'title-md'}>{user.u}</Typography>
          <Typography level={'body-xs'}>{user.id}</Typography>
        </div>
      </Stack>
    </MenuItem>
    <Divider/>
    <LogoutButton />
  </Menu>
</Dropdown>