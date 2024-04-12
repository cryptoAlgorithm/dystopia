import 'server-only'
import {WithId} from 'mongodb'
import {IBaseUser, IUser} from '@/data/IUser'
import {cookies} from 'next/headers'
import * as jwt from 'jsonwebtoken'
import {z} from 'zod'

const jwtSecret = Buffer.from(process.env.JWT_SECRET!, 'base64')
export const cookieKey = 'd-session'

const CookieSessionSchema = z.object({
  id: z.string(),
  u: z.string()
})
export type CookieSession = z.infer<typeof CookieSessionSchema>

export const generateJWTToken = (user: WithId<IBaseUser>): string => {
  return jwt.sign(
    { id: user._id, u: user.username },
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

export const getCookieSession = (): CookieSession | null => {
  const token = cookies().get(cookieKey)?.value
  if (!token) return null
  try {
    const claims = jwt.verify(token, jwtSecret)
    return CookieSessionSchema.parse(claims)
  } catch {
    return null
  }
}
