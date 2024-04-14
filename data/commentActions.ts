import 'server-only'
import {cache} from "react";
import {ClientComment, IComment} from "@/data/IComment";
import mongodb from "@/lib/mongodb";
import {ObjectId} from "bson";

export const getComments = cache(async (postId: string): Promise<ClientComment[]> => {
  const col = (await mongodb).db().collection<IComment>('comments')
  return col
    .aggregate<ClientComment>([{
      $match: {
        parent: ObjectId.createFromHexString(postId)
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
    }])
    .toArray()
})

export const createComment = async (content: string, parent: ObjectId, user: ObjectId): Promise<{ id: ObjectId | null }> => {
  const col = (await mongodb).db().collection<IComment>('comments')
  const res = await col.insertOne({
    content,
    parent,
    user
  })
  return { id: res.acknowledged ? res.insertedId : null }
}
