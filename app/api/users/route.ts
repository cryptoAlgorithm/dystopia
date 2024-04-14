import {addBotUser} from '@/app/(sidebar)/users/actions'
import {z} from 'zod'
import {catchAs400} from '@/util/catchAs400'

const postSchema = z.object({
  username: z.string(),
  persona: z.string().optional()
})

export const POST = catchAs400(postSchema, 'user', async ({ username, persona }): Promise<Response> =>
  Response.json({ id: await addBotUser(username, persona) })
)
