'use server'

import 'server-only'
import {getCookieSession} from '@/util/session/sessionManager'
import {IVote, VoteDelta} from '@/data/IVote'
import mongodb from '@/lib/mongodb'
import {ObjectId} from 'bson'
import {Filter} from 'mongodb'
import {revalidatePath} from 'next/cache'
import {IPost} from '@/data/IPost'

export const updateVote = async (target: string, delta: VoteDelta) => {
  const userSession = getCookieSession()
  if (!userSession) throw new Error('No session')

  if (!ObjectId.isValid(target)) throw new Error('Invalid ID')
  if (![-1, 0, 1].includes(delta)) throw new Error('Unexpected delta')
  const tgt = new ObjectId(target)

  const
    client = (await mongodb),
    db = client.db(),
    col = db.collection<IVote>('votes'),
    postCol = db.collection<IPost>('posts')
  const session = client.startSession()

  try {
    await session.withTransaction(async () => {
      // Ensure target doc exists
      const post = await postCol.findOne({ _id: tgt }, { session })
      if (!post) throw new Error('Post not found')

      const filter: Filter<IVote> = { user: new ObjectId(userSession.id), for: tgt }
      if (delta === 0) {
        // Delete the vote instead
        const res = await col.deleteOne(filter, { session })
        console.log('Deleting vote for', tgt)
        if (!res.acknowledged) throw new Error('Vote deletion failed')
      } else {
        const res = await col.updateOne(
          filter,
          { $set: { delta, for: tgt, user: new ObjectId(userSession.id) } },
          { upsert: true, session }
        )
        console.log('Voting:', delta, tgt)
        if (!res.acknowledged) throw new Error('Vote creation failed')
      }

      // Update vote count
      const updatedPost = await db
        .collection<IPost>('posts')
        .aggregate<{ voteCount: number }>([{
          $match: { _id: tgt }
        }, {
          $lookup: {
            from: 'votes',
            localField: '_id',
            foreignField: 'for',
            pipeline: [{
              $group: {
                _id: null,
                delta: { $sum: '$delta' }
              }
            }],
            as: 'votes'
          }
        }, {
          $set: {
            voteCount: { $ifNull: [{ $first: '$votes.delta' }, 0] }
          }
        }, {
          $project: { voteCount: 1 }
        }], {
          session
        })
        .toArray()
      if (updatedPost.length != 1) throw new Error('Post not found')
      const newVoteCount = updatedPost[0].voteCount
      console.log('New vote count:', newVoteCount)
      const updateRes = await db
        .collection<IPost>('posts')
        .updateOne({ _id: tgt }, { $set: { voteCount: newVoteCount } }, { session })
      if (!updateRes.acknowledged) throw new Error('Post update failed')
    })
  } finally {
    await session.endSession()
  }

  revalidatePath(`/posts/${target}`, 'page')
  revalidatePath('/', 'page')
}
