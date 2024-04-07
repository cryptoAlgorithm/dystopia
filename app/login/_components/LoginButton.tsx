'use client'

import {useFormStatus} from 'react-dom'
import {Button} from '@mui/joy'

export const LoginButton = () => {
  const { pending } = useFormStatus()
  return <Button type={'submit'} loading={pending}>Login</Button>
}
