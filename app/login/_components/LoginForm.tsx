'use client'

import { useFormState } from 'react-dom'
import {Box, Button, Card, FormControl, FormHelperText, Input, Sheet, Stack, useColorScheme, useTheme} from "@mui/joy";
import {loginAction} from "@/app/login/actions";
import {LoginButton} from '@/app/login/_components/LoginButton'
import Turnstile from 'react-turnstile'
import {useState} from 'react'

export default function LoginForm() {
  const [state, formAction] = useFormState(loginAction, { success: null })
  const [hasToken, setHasToken] = useState(false)
  const { mode } = useColorScheme()

  return <Stack component={'form'} action={formAction}>
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
    <Sheet sx={{ mt: 1, borderRadius: 'sm', overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
      <Box overflow={'hidden'}>
        <Turnstile
          style={{ margin: -2 }}
          sitekey={'0x4AAAAAAAWz4JsFLmr0aoeI'}
          fixedSize
          responseField responseFieldName={'turnstile'} action={'login'}
          theme={mode == 'system' ? 'auto' : mode}
          onVerify={(token) => {
            console.log('bing bong Turnstile', token)
            setHasToken(true)
          }}
          onExpire={() => setHasToken(false)}
        />
      </Box>
    </Sheet>
    <Button variant={'soft'} sx={{ mt: 1 }}>Sign Up</Button>
  </Stack>
}
