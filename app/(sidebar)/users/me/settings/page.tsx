import {
  Container, Divider, FormControl, FormLabel, Typography,
} from "@mui/joy";
import {ThemePicker} from '@/app/(sidebar)/users/me/settings/_components/ThemePicker'
import {cookieThemeKey, getCookieTheme} from '@/util/colorScheme'
import {cookies} from 'next/headers'

const setCookieTheme = async (theme: string) => {
  'use server'
  cookies().set(cookieThemeKey, theme)
}

export default async function User() {
  const mode = getCookieTheme()

  return <Container maxWidth={'sm'} sx={{ py: 2 }}>
    <Typography level={'h2'} gutterBottom>Settings</Typography>
    <FormControl>
      <FormLabel>Interface Theme</FormLabel>
      <ThemePicker mode={mode} setMode={setCookieTheme} />
    </FormControl>
    <Divider sx={{ my: 2 }} />
    <Typography level={'body-xs'}>Note: These settings are persisted on your browser and not synced with your account.</Typography>
  </Container>
}
