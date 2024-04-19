'use client'

import { useFormState } from 'react-dom'
import {Box, Button, FormControl, FormHelperText, Input, Sheet, Stack} from "@mui/joy";
import {loginAction} from "@/app/login/actions";
import {LoginButton} from '@/app/login/_components/LoginButton'
import Turnstile, {BoundTurnstileObject} from 'react-turnstile'
import {useRef, useState} from 'react'
import {DefaultColorScheme} from '@mui/joy/styles/types'

export default function LoginForm({ theme }: { theme: DefaultColorScheme }) {
  const [state, formAction] = useFormState(loginAction, { success: null })
  const [hasToken, setHasToken] = useState<string | null>(null)
  const turnstileRef = useRef<BoundTurnstileObject | null>(null)

  return <Stack component={'form'} action={formAction} onSubmit={() => {
    if (state) turnstileRef.current?.reset()
  }}>
    <Input
      size={'lg'} name={'user'} placeholder={'Username'} autoComplete={'username'} required
      sx={{
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderBottomWidth: 0
      }}
    />
    <FormControl error={state.success == false} required>
      <Input
        size={'lg'} endDecorator={<LoginButton disabled={!hasToken} />}
        name={'password'} placeholder={'Password'} type={'password'}
        sx={{
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}
      />
      { state.success == false && <FormHelperText>{state.reason}</FormHelperText> }
    </FormControl>
    { hasToken && <input value={hasToken} name={'turnstile'} hidden /> }
    <Sheet sx={{ mt: 1, borderRadius: 'sm', overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
      <Box overflow={'hidden'}>
        <Turnstile
          style={{ margin: -2 }}
          sitekey={'0x4AAAAAAAWz4JsFLmr0aoeI'}
          fixedSize
          action={'login'}
          theme={theme}
          onLoad={(_, turnstile) => {
            turnstileRef.current = turnstile
          }}
          onVerify={(token) => {
            console.log('bing bong Turnstile', token)
            setHasToken(token)
          }}
          onExpire={() => setHasToken(null)}
        />
      </Box>
    </Sheet>
    <Button variant={'soft'} sx={{ mt: 1 }}>Sign Up</Button>
  </Stack>
}
