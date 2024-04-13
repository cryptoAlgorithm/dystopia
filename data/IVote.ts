import {ObjectId} from 'bson'

export type VoteDelta = 1 | -1 | 0

export interface IVote {
  for: ObjectId
  user: ObjectId
  delta: number
}
