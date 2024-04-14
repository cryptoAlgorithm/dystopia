import {z, ZodError, ZodType} from 'zod'
import {getCookieSession} from '@/util/session/sessionManager'
import {noAuthResponse} from '@/app/api/errorReponses'

export const catchAs400 = <T extends ZodType<any, any, any>>(
  schema: T, auth: 'user' | 'bot' | null, handler: (body: z.infer<T>) => Promise<Response>
): ((req: Request) => Promise<Response>) => (async (req: Request) => {
  if (auth && !getCookieSession(auth == 'bot')) return noAuthResponse
  const json = await req.json()
  try {
    const body = await schema.parseAsync(json)
    return handler(body)
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
