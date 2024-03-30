import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Dropdown,
  Menu,
  MenuButton,
  MenuItem,
  Sheet,
  Stack,
  Typography
} from "@mui/joy";
import {CookieSession, getCookieSession} from '@/util/session/sessionManager'
import NextLink from 'next/link'
import {LogoutButton} from '@/components/user/LogoutButton'

const UserButton = ({ user }: { user: CookieSession }) => <Dropdown>
  <MenuButton slots={{ root: Sheet }} slotProps={{
    root: {
      variant: 'outlined', sx: {
        borderRadius: 'sm', p: .5,
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
    <MenuItem>
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

export default function Toolbar() {
  const user = getCookieSession()
  return <Stack component={'header'} direction={'row'} sx={{
    alignItems: 'center',
    py: 1, px: 2,
    position: 'fixed',
    left: 0, right: 0,
    zIndex: 100,
    backdropFilter: 'blur(12px) saturate(1.2)',
    height: 54,
    borderBottom: '1px solid var(--joy-palette-divider)'
  }}>
    <Typography level={'h4'} component={'h1'}>Dystopia</Typography>
    <Box flex={1} />
    { !!user ? <UserButton user={user} /> : <Button variant={'solid'} component={NextLink} href={'/login'}>Login</Button> }
  </Stack>
}
