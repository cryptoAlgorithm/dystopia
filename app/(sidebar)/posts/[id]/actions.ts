'use server'

import {ErrorPayload} from '@/data/types'
import {getCookieSession} from '@/util/session/sessionManager'
import {ObjectId} from 'bson'
import {addComment} from '@/data/commentActions'
import {revalidatePath} from 'next/cache'

export const createCommentAction = async (
  postID: string,
  formData: FormData
): Promise<ErrorPayload> => {
  const comment = formData.get('comment')
  if (!comment || typeof comment != 'string' || !ObjectId.isValid(postID)) throw new Error('Invalid payload')
  const session = getCookieSession()
  if (!session) throw new Error('No session')
  const res = await addComment(
    comment,
    ObjectId.createFromHexString(postID), ObjectId.createFromHexString(session.id)
  )
  if (res.id) revalidatePath(`/posts/${postID}`)
  return { error: res.id ? null : 'Failed to create comment' }
}
