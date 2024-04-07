import {Textarea} from '@mui/joy'
import {createCommentAction} from '@/app/(feed)/posts/[id]/actions'
import {PostButton} from '@/components/post/PostButton'

export const CommentComposer = ({ postID }: { postID: string }) => {
  const action = createCommentAction.bind(null, postID)

  return <form action={action}>
    <Textarea
      placeholder={'Write a comment...'} name={'comment'}
      size={'lg'} variant={'outlined'} sx={{ '--Textarea-radius': 'var(--joy-radius-md)' }}
      endDecorator={<PostButton />}
    />
  </form>
}
