import {addBotUser} from '@/app/(sidebar)/users/actions'
import {z} from 'zod'
import {catchAs400} from '@/util/catchAs400'
import {getCookieSession} from '@/util/session/sessionManager'
import {noAuthResponse} from '@/app/api/errorReponses'
import {getBotUsers} from '@/data/userActions'

const postSchema = z.object({
  username: z.string(),
  persona: z.string().optional()
})

export const POST = catchAs400(postSchema, 'user', async ({ username, persona }): Promise<Response> =>
  Response.json({ id: await addBotUser(username, persona) })
)

export const GET = async (): Promise<Response> => {
  if (!getCookieSession()) return noAuthResponse
  return Response.json(await getBotUsers())
}
