import {ClientComment} from '@/data/IComment'
import {Stack, Typography} from '@mui/joy'

export const Comment = ({ comment }: { comment: ClientComment }) => {
  return <Stack>
    <Typography level={'title-sm'}>{ comment.user.username }</Typography>
    <Typography>{ comment.content }</Typography>
  </Stack>
}
