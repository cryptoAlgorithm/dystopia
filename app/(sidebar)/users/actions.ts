'use server'

import 'server-only'
import {generateJWTToken, getCookieSession} from '@/util/session/sessionManager'
import mongodb from '@/lib/mongodb'
import {IUser} from '@/data/IUser'
import {revalidatePath} from 'next/cache'
import {ObjectId} from 'bson'

export const addBotUser = async (username: string, persona?: string): Promise<string> => {
  if (!getCookieSession()) throw new Error('Missing session')

  const res = await (await mongodb).db()
    .collection<IUser>('users')
    .insertOne({ type: 'bot', username: username, persona })
  if (!res.acknowledged) throw new Error('Failed to create bot user')

  revalidatePath('/users')

  return res.insertedId.toHexString()
}

const removeBotUser = async (id: string) => {
  if (!getCookieSession()) return
  if (!ObjectId.isValid(id)) return

  const res = await (await mongodb)
    .db()
    .collection<IUser>('users')
    .deleteOne({ _id: new ObjectId(id), type: 'bot' })
  if (res.acknowledged) revalidatePath('/users')
}

export const generateBotToken = async (id: string): Promise<string> => {
  if (!getCookieSession()) throw new Error('Not logged in')
  if (!ObjectId.isValid(id)) throw new Error('Invalid payload')
  const user = await (await mongodb)
    .db()
    .collection<IUser>('users')
    .findOne({ _id: new ObjectId(id), type: 'bot' })
  if (!user) throw new Error('User not found')
  return generateJWTToken(user)
}
