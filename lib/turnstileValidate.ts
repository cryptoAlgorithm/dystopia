import 'server-only'
import {headers} from 'next/headers'

const turnstileToken = process.env.TURNSTILE_SECRET
if (!turnstileToken) {
  throw new Error('Turnstile token missing in environment!')
}

export const turnstileValidate = async (token: string): Promise<boolean> => {
  const ip = headers().get('x-forwarded-for') ?? '0.0.0.0'
  console.log('Validating Turnstile:', token, ip)
  let formData = new FormData();
  formData.append('secret', turnstileToken);
  formData.append('response', token);
  formData.append('remoteip', ip);

  const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
  const result = await fetch(url, {
    body: formData,
    method: 'POST'
  });

  const outcome = await result.json();
  console.log('Turnstile result: ', outcome)
  return outcome.success ?? false
}
