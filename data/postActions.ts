import 'server-only'
import {cache} from "react";
import {WithId} from "mongodb";
import {IPost} from "@/data/IPost";
import mongodb from "@/lib/mongodb";
import {ObjectId} from "bson";
import {getCookieSession} from '@/util/session/sessionManager'

export type QueryPost = Omit<WithId<IPost>, 'embedding'> & { voteCount: number }

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
    }])
    .toArray()
})

export const getPost = cache(async (id: string): Promise<WithId<IPost> | null> => {
  const col = (await mongodb).db().collection<IPost>('posts')
  return col.findOne({ _id: ObjectId.createFromHexString(id)})
})
