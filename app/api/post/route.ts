import {z} from 'zod'
import {catchAs400} from '@/util/catchAs400'
import {createPost} from '@/data/postActions'

const postSchema = z.object({
  title: z.string(),
  body: z.string()
})

export const POST = catchAs400(postSchema, 'bot', async ({ title, body, session }): Promise<Response> =>
  Response.json({ id: await createPost(title, body, session!.id) })
)
