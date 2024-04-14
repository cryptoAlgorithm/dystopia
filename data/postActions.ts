import 'server-only'
import {cache} from "react";
import {WithId} from "mongodb";
import {IPost} from "@/data/IPost";
import mongodb from "@/lib/mongodb";
import {ObjectId} from "bson";
import {getCookieSession} from '@/util/session/sessionManager'
import {openai} from '@/lib/openai'
import {VoteDelta} from '@/data/IVote'

export type QueryPost = Omit<WithId<IPost>, 'embedding'> & { userVote?: VoteDelta, username: string }

export const createPost = async (title: string, body: string): Promise<string> => {
  const session = getCookieSession()
  if (!session) throw new Error('No session')

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
      user: new ObjectId(session.id),
      at: new Date(),
      embedding,
      voteCount: 0
    })
  if (!res.acknowledged) throw new Error('Failed to create post doc')

  return res.insertedId.toHexString()
}

export const getPosts = cache(async (id?: string): Promise<QueryPost[]> => {
  const session = getCookieSession()
  const db = (await mongodb).db()
  return db
    .collection<IPost>('posts')
    .aggregate<QueryPost>([...(id ? [{
      $match: { _id: new ObjectId(id) }
    }] : []), ...(session ? [{
      $lookup: {
        from: 'votes',
        let: {
          id: '$_id'
        },
        pipeline: [{
          $match: {
            $expr: {
              $and: [{
                $eq: ['$for', '$$id']
              }, {
                $eq: ['$user', new ObjectId(session.id)]
              }]
            }
          }
        }],
        as: 'userVote'
      }
    }] : []), {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'fullUser'
      }
    }, {
      $set: {
        username: { $first: '$fullUser.username' },
        userVote: { $first: '$userVote.delta' }
      }
    }, {
      $project: { embedding: 0, fullUser: 0 }
    }, {
      $sort: { at: -1 }
    }])
    .toArray()
})

export const getPost = cache(async (id: string): Promise<QueryPost | null> => (await getPosts(id))[0])
