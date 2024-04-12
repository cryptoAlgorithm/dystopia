'use client'

import {Textarea} from '@mui/joy'
import {useState} from 'react'

export const PostComposer = () => {
  const [expanded, setExpanded] = useState(false)
  return <Textarea size={'lg'} onFocus={() => setExpanded(true)} onBlur={() => setExpanded(false)} />
}
