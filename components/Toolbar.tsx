import {
  Box,
  Button,
  Stack,
  Typography
} from "@mui/joy";
import {getCookieSession} from '@/util/session/sessionManager'
import NextLink from 'next/link'
import {UserButton} from '@/components/user/UserButton'
import AddRounded from '@mui-symbols-material/w400/AddRounded'

export default function Toolbar() {
  const user = getCookieSession()
  return <Stack spacing={1} component={'header'} direction={'row'} sx={{
    alignItems: 'center',
    py: 1, px: 2, pl: { xs: '56px', sm: 2 },
    position: 'fixed',
    left: 0, right: 0,
    zIndex: 100,
    backdropFilter: 'saturate(1.8) blur(20px)',
    height: 54,
    borderBottom: '1px solid var(--joy-palette-divider)',
    ':root [data-joy-color-scheme="light"] &': {
      backgroundColor: 'rgba(250 250 250 / .6)'
    },
    ':root [data-joy-color-scheme="dark"] &': {
      backgroundColor: 'rgba(22 22 22 / .6)'
    }
  }}>
    <Typography level={'h4'} component={'h1'}>Dystopia</Typography>
    <Box flex={1} />
    { !!user
      ? <>
        <Button component={NextLink} href={'/post'} variant={'soft'}
                startDecorator={<AddRounded />} sx={{ height: 42, fontSize: 'md', borderRadius: 100 }}>Post</Button>
        <UserButton user={user} />
      </>
      : <Button component={NextLink} href={'/login'}>Login</Button>
    }
  </Stack>
}
