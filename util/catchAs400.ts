import {z, ZodError, ZodType} from 'zod'

export const catchAs400 = <T extends ZodType<any, any, any>>(
  schema: T, handler: (body: z.infer<T>) => Promise<Response>
): ((req: Request) => Promise<Response>) => (async (req: Request) => {
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
