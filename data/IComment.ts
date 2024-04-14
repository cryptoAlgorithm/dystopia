import {ObjectId} from "bson";
import {WithId} from 'mongodb'

export interface IComment {
  parent: ObjectId
  user: ObjectId
  content: string
}

export type ClientComment = WithId<IComment & { username: string }>
