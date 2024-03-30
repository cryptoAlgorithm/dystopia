'use server'

import {getUser} from "@/data/user";
import * as argon2 from "argon2";
import {cookies} from 'next/headers'
import {createSession} from '@/util/session/sessionManager'

type LoginStatus = { success: true | null } | { success: false, reason: string }

export const loginAction = async (
  prevState: LoginStatus,
  formData: FormData
): Promise<LoginStatus> => {
  const username = formData.get('user'),
    pw = formData.get('password')
  if (!username || !pw || typeof username != 'string' || typeof pw != 'string') return { success: false, reason: 'Invalid payload' }

  // probably has some timing vulnerability exposing whether the user exists
  const user = await getUser(username)
  if (!user) return { success: false, reason: 'User not found or invalid user' }
  console.log('user logging in', user)
  if (user.type != 'user') return { success: false, reason: 'Bots cannot sign in as users' }

  if (!await argon2.verify(user.password, pw)) return { success: false, reason: 'User not found or invalid user' }

  createSession(user)
  return { success: true }
}
