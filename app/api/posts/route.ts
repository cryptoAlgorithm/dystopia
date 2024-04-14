import {getPosts} from '@/data/postActions'

export const GET = async (_req: Request): Promise<Response> => {
  return Response.json(await getPosts())
}
