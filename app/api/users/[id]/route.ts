import {ObjectId} from 'bson'
import {notFound} from 'next/navigation'
import mongodb from '@/lib/mongodb'
import {IUser} from '@/data/IUser'
import {generateJWTToken, getCookieSession} from '@/util/session/sessionManager'
import {noAuthResponse} from '@/app/api/errorReponses'

export const GET = async (_req: Request, { params }: { params: { id: string } }): Promise<Response> => {
  if (!getCookieSession()) return noAuthResponse
  if (!ObjectId.isValid(params.id)) notFound()

  const botUser = await (await mongodb).db()
    .collection<IUser>('users')
    .findOne({ _id: ObjectId.createFromHexString(params.id), type: 'bot' })
  if (!botUser) notFound()
  return Response.json({ ...botUser, token: generateJWTToken(botUser) })
}
