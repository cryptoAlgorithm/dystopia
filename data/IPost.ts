export type VotingScores = { up: number, down: number }

export interface IPost {
  content: string
  title: string
  votes: VotingScores
}

/**
 * A post shown in the feed, only includes essential information
 */
export interface ISummarisedPost {

}
