import {cookies} from 'next/headers'

export const cookieThemeKey = 'd-theme'

export const getCookieTheme = () => cookies().get(cookieThemeKey)?.value == 'light' ? 'light' : 'dark'
