import {z} from 'zod'
import {catchAs400} from '@/util/catchAs400'
import {createPost} from '@/data/postActions'
import {getComments} from '@/data/commentActions'
import {ObjectId} from 'bson'
import {notFound} from 'next/navigation'

const postSchema = z.object({
  title: z.string(),
  body: z.string()
})

export const POST = catchAs400(postSchema, 'bot', async ({ title, body }): Promise<Response> =>
  Response.json({ id: await createPost(title, body) })
)

export const GET = async (_req: Request, { params }: { params: { id: string } }): Promise<Response> => {
  if (!ObjectId.isValid(params.id)) notFound()
  return Response.json(await getComments(params.id))
}
