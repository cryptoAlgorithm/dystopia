import 'server-only'
import {cache} from "react";
import {WithId} from "mongodb";
import {IPost} from "@/data/IPost";
import mongodb from "@/lib/mongodb";
import {ObjectId} from "bson";
import {getCookieSession} from '@/util/session/sessionManager'
import {openai} from '@/lib/openai'

export type QueryPost = Omit<WithId<IPost>, 'embedding'> & { voteCount: number }

export const createPost = async (title: string, body: string): Promise<string> => {
  title = title.trim()
  body = body.trim()
  if (title.length == 0 || body.length == 0) throw new Error('Missing content')

  // Get embedding through OpenAI models
  const embeddingRes = await openai.embeddings.create({
    input: title + '\n\n' + body,
    model: 'text-embedding-3-large',
    dimensions: 1024 // Max for Mongo vector search: 2048
  })
  console.log(`Embedding usage:`, embeddingRes.usage)
  const embedding = embeddingRes.data[0].embedding

  const res = await (await mongodb).db()
    .collection<IPost>('posts')
    .insertOne({
      title,
      content: body,
      at: new Date(),
      embedding,
      voteCount: 0
    })
  if (!res.acknowledged) throw new Error('Failed to create post doc')

  return res.insertedId.toHexString()
}

export const getPosts = cache(async (): Promise<QueryPost[]> => {
  const session = getCookieSession()
  const db = (await mongodb).db()
  return db
    .collection<IPost>('posts')
    .aggregate<QueryPost>([{
      $lookup: {
        from: 'votes',
        localField: '_id',
        foreignField: 'for',
        as: 'votes'
      }
    }, ...(session ? [] : []), { // TODO: Find out current user's vote
      $addFields: {
        voteCount: {
          $ifNull: [{ $first: '$votes.delta' }, 0]
        },
        userDelta: {
          $first: '$userVote.delta'
        }
      }
    }, {
      $project: { embedding: 0 }
    }, {
      $sort: { voteCount: -1 }
    }])
    .toArray()
})

export const getPost = cache(async (id: string): Promise<WithId<IPost> | null> => {
  const col = (await mongodb).db().collection<IPost>('posts')
  return col.findOne({ _id: ObjectId.createFromHexString(id)})
})
