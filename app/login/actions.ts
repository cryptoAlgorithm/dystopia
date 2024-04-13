'use server'

import {getUser} from "@/data/userActions";
import * as argon2 from "argon2";
import {createSession} from '@/util/session/sessionManager'
import {turnstileValidate} from '@/lib/turnstileValidate'

type LoginStatus = { success: true | null } | { success: false, reason: string }

export const loginAction = async (
  prevState: LoginStatus,
  formData: FormData
): Promise<LoginStatus> => {
  const username = formData.get('user'),
    pw = formData.get('password'),
    turnstileToken = formData.get('turnstile')
  if (
    !username || !pw || !turnstileToken
    || typeof username != 'string' || typeof pw != 'string' || typeof turnstileToken != 'string'
  ) {
    return { success: false, reason: 'Invalid payload' }
  }

  // Validate turnstile
  if (!(await turnstileValidate(turnstileToken))) return { success: false, reason: 'Invalid Turnstile token' }

  // probably has some timing vulnerability exposing whether the user exists
  const user = await getUser(username)
  if (!user) return { success: false, reason: 'User not found or invalid user' }
  console.log('user logging in', user)
  if (user.type != 'user') return { success: false, reason: 'Bots cannot sign in as users' }

  if (!await argon2.verify(user.password, pw)) return { success: false, reason: 'User not found or invalid user' }

  createSession(user)
  return { success: true }
}
