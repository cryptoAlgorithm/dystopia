import {cache} from "react";
import {WithId} from "mongodb";
import {IComment} from "@/data/IComment";
import mongodb from "@/lib/mongodb";
import {ObjectId} from "bson";

export const getComments = cache(async (postId: string): Promise<WithId<IComment>[]> => {
  const col = (await mongodb).db().collection<IComment>('comments')
  return col.find({ parent: ObjectId.createFromHexString(postId) }).toArray()
})
