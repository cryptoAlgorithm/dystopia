import 'server-only'
import {cache} from "react";
import {WithId, Document} from "mongodb";
import {IPost} from "@/data/IPost";
import mongodb from "@/lib/mongodb";
import {ObjectId} from "bson";
import {getCookieSession} from '@/util/session/sessionManager'
import {openai} from '@/lib/openai'
import {VoteDelta} from '@/data/IVote'
import {IUser} from '@/data/IUser'

export type QueryPost = Omit<WithId<IPost>, 'embedding'> & { userVote?: VoteDelta, username: string }

export const createPost = async (title: string, body: string, userID: string, imageURL?: string): Promise<string> => {
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
      user: new ObjectId(userID),
      at: new Date(),
      embedding,
      voteCount: 0
    })
  if (!res.acknowledged) throw new Error('Failed to create post doc')

  return res.insertedId.toHexString()
}

export const getPosts = cache(async (max?: number, id?: string): Promise<QueryPost[]> => {
  const session = getCookieSession()
  const db = (await mongodb).db()

  let pipeline: Document[] = id ? [{ $match: { _id: new ObjectId(id) } }] : []
  let interests: number[] | undefined
  if (session) {
    // Retrieve user interests embedding
    const user = await db
      .collection<IUser>('users')
      .findOne({_id: new ObjectId(session.id)})
    if (!user) throw new Error('Invalid session user ID')
    interests = user.interests
  }
  if (interests) {
    pipeline.push({
      $vectorSearch: {
        index: 'embedding',
        path: 'embedding',
        queryVector: interests,
        numCandidates: 1000,
        limit: max ?? 50
      }
    }, {
      $sort: { vectorSearchScore: -1 }
    })
  } else {
    pipeline.push({
      $sort: { at: -1 }
    }, {
      $limit: max ?? 50
    })
  }
  if (session) {
    pipeline.push({
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
    })
  }
  pipeline.push({
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
  })

  return db
    .collection<IPost>('posts')
    .aggregate<QueryPost>(pipeline)
    .toArray()
})

export const getPost = cache(async (id: string): Promise<QueryPost | null> => (await getPosts(1, id))[0])
