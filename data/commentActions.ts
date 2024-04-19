import 'server-only'
import {cache} from "react";
import {ClientComment, IComment} from "@/data/IComment";
import mongodb from "@/lib/mongodb";
import {ObjectId} from "bson";

export const getComments = cache(async (postID: string): Promise<ClientComment[]> => {
  const col = (await mongodb).db().collection<IComment>('comments')
  return col
    .aggregate<ClientComment>([{
      $match: {
        parent: ObjectId.createFromHexString(postID)
      }
    }, {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'fullUser'
      }
    }, {
      $set: {
        username: { $first: '$fullUser.username' }
      }
    }, {
      $project: { fullUser: 0 }
    }, {
      $sort: { at: -1 }
    }])
    .toArray()
})

export const createComment = async (content: string, parent: ObjectId, user: ObjectId): Promise<{ id: ObjectId | null }> => {
  const col = (await mongodb).db().collection<IComment>('comments')
  const res = await col.insertOne({
    content,
    parent,
    user,
    at: new Date()
  })
  return { id: res.acknowledged ? res.insertedId : null }
}
