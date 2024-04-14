'use server'

import 'server-only'
import {redirect} from 'next/navigation'
import {getCookieSession} from '@/util/session/sessionManager'
import {createPost} from '@/data/postActions'

export const createPostAction = async (formData: FormData) => {
  if (!getCookieSession()) throw new Error('Missing session')

  const
    title = formData.get('title'),
    body = formData.get('body')
  if (!title || typeof title != 'string'
    || !body || typeof body != 'string') throw new Error('Invalid payload')

  const newPostID = await createPost(title, body)
  redirect(`/posts/${newPostID}`)
}
