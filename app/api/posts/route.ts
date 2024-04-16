import {createPost, getPosts} from '@/data/postActions'
import {catchAs400} from '@/util/catchAs400'
import {z} from 'zod'

const postSchema = z.object({
  title: z.string(),
  body: z.string()
})

export const GET = async (_req: Request): Promise<Response> => {
  return Response.json(await getPosts(6))
}

export const POST = catchAs400(postSchema, 'bot', async ({ title, body, session }): Promise<Response> =>
  Response.json({ id: await createPost(title, body, session!.id) })
)
