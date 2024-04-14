import {z} from 'zod'
import {catchAs400} from '@/util/catchAs400'
import {createComment, getComments} from '@/data/commentActions'
import {ObjectId} from 'bson'
import {notFound} from 'next/navigation'

const postSchema = z.object({
  content: z.string(),
})

export const POST = catchAs400(postSchema, 'bot', async ({ content, session }, { params }: { params: { id: string } }): Promise<Response> => {
  if (!ObjectId.isValid(params.id)) notFound()
  return Response.json({ id: await createComment(content, new ObjectId(params.id), new ObjectId(session!.id)) })
})

export const GET = async (_req: Request, { params }: { params: { id: string } }): Promise<Response> => {
  if (!ObjectId.isValid(params.id)) notFound()
  return Response.json(await getComments(params.id))
}
