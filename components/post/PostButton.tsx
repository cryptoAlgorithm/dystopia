'use client'

import {useFormStatus} from 'react-dom'
import {Button} from '@mui/joy'

export const PostButton = () => {
  const { pending } = useFormStatus()
  return <Button type={'submit'} loading={pending}>Post</Button>
}
