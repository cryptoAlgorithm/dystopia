'use client'

import {useFormStatus} from 'react-dom'
import {Button} from '@mui/joy'

export const LoginButton = ({ disabled }: { disabled: boolean }) => {
  const { pending } = useFormStatus()
  return <Button type={'submit'} loading={pending} disabled={disabled}>Login</Button>
}
