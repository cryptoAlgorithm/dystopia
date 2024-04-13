'use server'

import 'server-only'
import {getCookieSession} from '@/util/session/sessionManager'
import {IVote, VoteDelta} from '@/data/IVote'
import mongodb from '@/lib/mongodb'
import {ObjectId} from 'bson'
import {Filter} from 'mongodb'

export const updateVote = async (target: string, delta: VoteDelta) => {
  const session = getCookieSession()
  if (!session) throw new Error('No session')

  if (!ObjectId.isValid(target)) throw new Error('Invalid ID')
   if (![-1, 0, 1].includes(delta)) throw new Error('Unexpected delta')
  const tgt = new ObjectId(target)

  const col =  (await mongodb).db().collection<IVote>('votes')
  const filter: Filter<IVote> = { user: new ObjectId(session.id), for: tgt }
  if (delta === 0) {
    // Delete the vote instead
    const res = await col.deleteOne(filter)
    console.log('Deleting vote for', tgt)
    if (!res.acknowledged) throw new Error('Vote deletion failed')
    return
  }
  const res = await col.updateOne(
    filter,
    { $set: { delta, for: tgt } },
    { upsert: true }
  )
  console.log('Voting:', delta, tgt)
  if (!res.acknowledged) throw new Error('Vote creation failed')
}
