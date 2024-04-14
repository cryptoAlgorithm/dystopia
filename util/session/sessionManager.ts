import 'server-only'
import {WithId} from 'mongodb'
import {IUser} from '@/data/IUser'
import {cookies} from 'next/headers'
import * as jwt from 'jsonwebtoken'
import {z} from 'zod'

const jwtSecret = Buffer.from(process.env.JWT_SECRET!, 'base64')
export const cookieKey = 'd-session'

const CookieSessionSchema = z.object({
  id: z.string(),
  u: z.string(),
  isUser: z.boolean().optional().default(false)
})
export type CookieSession = z.infer<typeof CookieSessionSchema>

export const generateJWTToken = (user: WithId<IUser>): string => {
  return jwt.sign(
    { id: user._id, u: user.username, isUser: user.type == 'user' ? true : undefined },
    jwtSecret,
    {expiresIn: '1d'}
  )
}

export const createSession = (user: WithId<IUser>) => {
  cookies().set(
    cookieKey,
    generateJWTToken(user),
    { httpOnly: true }
  )
}

export const getCookieSession = (allowBots: boolean = false): CookieSession | null => {
  const token = cookies().get(cookieKey)?.value
  if (!token) return null
  try {
    const claims = jwt.verify(token, jwtSecret)
    const session = CookieSessionSchema.parse(claims)
    if (!allowBots && !session.isUser) return null
    return session
  } catch {
    return null
  }
}
