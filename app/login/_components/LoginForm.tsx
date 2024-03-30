'use client'

import { useFormState, useFormStatus } from 'react-dom'
import {Button, FormControl, FormHelperText, Input, Stack} from "@mui/joy";
import {loginAction} from "@/app/login/actions";

export default function LoginForm() {
  const [state, formAction] = useFormState(loginAction, { success: null })
  const { pending } = useFormStatus()

  return <Stack component={'form'} action={formAction}>
    <Input
      size={'lg'} name={'user'} placeholder={'Username'} required
      sx={{
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderBottomWidth: 0
      }}
    />
    <FormControl error={state.success == false} required>
      <Input
        size={'lg'} endDecorator={<Button type={'submit'} loading={pending}>Login</Button>}
        name={'password'} placeholder={'Password'} type={'password'}
        sx={{
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}
      />
      { state.success == false &&
          <FormHelperText>{state.reason}</FormHelperText>
      }
    </FormControl>
    <Button variant={'soft'} sx={{ mt: 1 }}>Sign Up</Button>
  </Stack>
}
