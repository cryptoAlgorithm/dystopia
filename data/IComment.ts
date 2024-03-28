import {ObjectId} from "bson";

export interface IComment {
  parent: ObjectId
  user: ObjectId
  content: string
}
