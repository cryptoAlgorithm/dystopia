import {catchAs400} from '@/util/catchAs400'
import {z} from 'zod'
import {updateVote} from '@/data/voteActions'
import {getPost} from '@/data/postActions'
import {ObjectId} from 'bson'
import {notFound} from 'next/navigation'

const putSchema = z.object({
  vote: z.union([z.literal(-1), z.literal(1)])
})

export const PUT = catchAs400(putSchema, 'bot', async ({ vote }, { params }: { params: { id: string } }): Promise<Response> => {
  await updateVote(params.id, vote)
  return new Response(null, { status: 204 })
})

export const GET = async (_req: Request, { params }: { params: { id: string } }): Promise<Response> => {
  if (!ObjectId.isValid(params.id)) notFound()
  return Response.json(await getPost(params.id))
}
