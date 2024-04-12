import 'server-only'
import OpenAI from 'openai'

if (!process.env.OPENAI_SECRET || !process.env.OPENAI_ORGANISATION) {
  throw new Error('Missing OpenAI config in environment')
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_SECRET,
  organization: process.env.OPENAI_ORGANISATION
})
