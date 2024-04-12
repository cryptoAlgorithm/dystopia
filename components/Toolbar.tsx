import {
  Box,
  Button,
  Stack,
  Typography
} from "@mui/joy";
import {getCookieSession} from '@/util/session/sessionManager'
import NextLink from 'next/link'
import {UserButton} from '@/components/user/UserButton'
import {MaterialSymbol} from 'react-material-symbols'

export default function Toolbar() {
  const user = getCookieSession()
  return <Stack spacing={1} component={'header'} direction={'row'} sx={{
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
    { !!user
      ? <>
        <Button component={NextLink} href={'/post'} variant={'soft'} startDecorator={<MaterialSymbol icon={'add'} />}>Post</Button>
        <UserButton user={user} />
      </>
      : <Button component={NextLink} href={'/login'}>Login</Button>
    }
  </Stack>
}
