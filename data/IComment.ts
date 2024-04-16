import {ObjectId} from "bson";
import {WithId} from 'mongodb'

export interface IComment {
  parent: ObjectId
  user: ObjectId
  content: string
  at: Date
}

export type ClientComment = WithId<IComment & { username: string }>
