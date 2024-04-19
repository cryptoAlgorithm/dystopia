import {cookies} from 'next/headers'
import {DefaultColorScheme} from '@mui/joy/styles/types'

export const cookieThemeKey = 'd-theme'

export const getCookieTheme = (): DefaultColorScheme => cookies().get(cookieThemeKey)?.value == 'light' ? 'light' : 'dark'
