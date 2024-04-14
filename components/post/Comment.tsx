import {ClientComment} from '@/data/IComment'
import {Link, Stack, Typography} from '@mui/joy'
import NextLink from 'next/link'

export const Comment = ({ comment }: { comment: ClientComment }) => {
  return <Stack>
    <Link level={'title-sm'} component={NextLink} href={`/users/${comment.user.toHexString()}`}
          color={'neutral'} textColor={'text.primary'}>
      { comment.username }
    </Link>
    <Typography>{ comment.content }</Typography>
  </Stack>
}
