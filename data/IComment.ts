import {ObjectId} from "bson";
import {IUser} from '@/data/IUser'
import {WithId} from 'mongodb'

export interface IComment {
  parent: ObjectId
  user: ObjectId
  content: string
}

export type ClientComment = WithId<IComment & { user: IUser }>
