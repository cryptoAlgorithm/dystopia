'use server'

import 'server-only'
import mongodb from '@/lib/mongodb'
import {IPost} from '@/data/IPost'
import {redirect} from 'next/navigation'
import {openai} from '@/lib/openai'
import {getCookieSession} from '@/util/session/sessionManager'

export const createPost = async (formData: FormData) => {
  if (!getCookieSession()) throw new Error('Missing session')

  const
    formTitle = formData.get('title'),
    formBody = formData.get('body')
  if (!formTitle || typeof formTitle != 'string'
    || !formBody || typeof formBody != 'string') throw new Error('Invalid payload')
  const
    title = formTitle.trim(),
    body = formBody.trim()
  if (title.length == 0 || body.length == 0) throw new Error('Missing content')

  // Get embedding through OpenAI models
  const embeddingRes = await openai.embeddings.create({
    input: title + '\n\n' + body,
    model: 'text-embedding-3-large',
    dimensions: 1024 // Max for Mongo vector search: 2048
  })
  console.log(`Embedding usage:`, embeddingRes.usage)
  const embedding = embeddingRes.data[0].embedding

  const res = await (await mongodb).db()
    .collection<IPost>('posts')
    .insertOne({
      title,
      content: body,
      at: new Date(),
      embedding
    })
  if (!res.acknowledged) throw new Error('Failed to create post doc')

  redirect(`/posts/${res.insertedId.toHexString()}`)
}
