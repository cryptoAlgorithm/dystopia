import {z, ZodError, ZodType} from 'zod'
import {CookieSession, getCookieSession} from '@/util/session/sessionManager'
import {noAuthResponse} from '@/app/api/errorReponses'

export const catchAs400 = <T extends ZodType<any, any, any>, P>(
  schema: T, auth: 'user' | 'bot' | null, handler: (body: z.infer<T> & { session: CookieSession | null }, params: P) => Promise<Response>
): ((req: Request, params: P) => Promise<Response>) => (async (req, params) => {
  const session = getCookieSession(auth == 'bot')
  if (auth && !session) return noAuthResponse
  const json = await req.json()
  try {
    const body = await schema.parseAsync(json)
    return handler({ ...body, session }, params)
  } catch (e) {
    if (e instanceof ZodError) {
      console.warn('Zod validation error', e.errors)
      return Response.json({ error: 'Invalid payload' }, { status: 400 })
    } else if (e instanceof Error) {
      return Response.json({ error: e.message })
    } else {
      return Response.error()
    }
  }
})
