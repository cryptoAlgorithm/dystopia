'use server'

import {cookies} from 'next/headers'
import {cookieKey} from '@/util/session/sessionManager'

export const removeSession = async () => {
  cookies().delete(cookieKey)
}
