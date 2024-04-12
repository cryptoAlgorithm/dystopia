
export interface IPost {
  content: string
  title: string
  at: Date
  /**
   * Embedding vector
   */
  embedding: number[]
}

/**
 * A post shown in the feed, only includes essential information
 */
export interface ISummarisedPost {

}
