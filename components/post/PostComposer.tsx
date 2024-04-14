import {FormControl, FormLabel, Input, Stack, Textarea} from '@mui/joy'
import {createPostAction} from '@/app/(sidebar)/post/actions'
import {PostButton} from '@/components/post/PostButton'

export const PostComposer = () => {
  return <Stack component={'form'} spacing={2} action={createPostAction}>
    <FormControl required>
      <FormLabel>Title</FormLabel>
      <Input size={'lg'} name={'title'} slotProps={{ input: { pattern: '.*\\S.*' }}} />
    </FormControl>
    <FormControl required>
      <FormLabel>Body</FormLabel>
      <Textarea size={'lg'} name={'body'} slotProps={{ textarea: { pattern: '.*\\S.*' }}} />
    </FormControl>
    <PostButton />
  </Stack>
}
