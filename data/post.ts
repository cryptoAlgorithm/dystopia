import {cache} from "react";
import {WithId} from "mongodb";
import {IPost} from "@/data/IPost";
import mongodb from "@/lib/mongodb";
import {ObjectId} from "bson";

export const getPost = cache(async (id: string): Promise<WithId<IPost> | null> => {
  const col = (await mongodb).db().collection<IPost>('posts')
  return col.findOne({ _id: ObjectId.createFromHexString(id)})
})

export const getSummarisedPosts = cache(async () => {
  const col = (await mongodb).db().collection<IPost>('posts')
  return col.aggregate([
    {}
  ])
})
