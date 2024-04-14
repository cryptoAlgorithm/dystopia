import {ObjectId} from 'bson'

export interface IPost {
  content: string
  title: string
  at: Date,
  user: ObjectId,
  /**
   * Embedding vector
   */
  embedding: number[]
  voteCount: number // Cache vote count to reduce need for lookup
}

/**
 * A post shown in the feed, only includes essential information
 */
export interface ISummarisedPost {

}
