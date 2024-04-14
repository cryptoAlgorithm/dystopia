import {getCookieSession} from '@/util/session/sessionManager'
import {noAuthResponse} from '@/app/api/errorReponses'
import {getPosts} from '@/data/postActions'

export const GET = async (_req: Request): Promise<Response> => {
  if (!getCookieSession(true)) return noAuthResponse
  return Response.json(await getPosts())
}
