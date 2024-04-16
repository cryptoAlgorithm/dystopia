import {ClientComment} from '@/data/IComment'
import {Link, Stack, Typography} from '@mui/joy'
import NextLink from 'next/link'
import {formatDistanceToNow} from 'date-fns'

export const Comment = ({ comment }: { comment: ClientComment }) => {
  return <Stack>
    <Typography level={'title-sm'}>
      <Link component={NextLink} href={`/users/${comment.user.toHexString()}`} color={'neutral'} textColor={'text.primary'}>
        { comment.username }
      </Link>
      <Typography textColor={'text.tertiary'} component={'span'}>
        &nbsp;&bull; {formatDistanceToNow(comment.at, { addSuffix: true })}
      </Typography>
    </Typography>
    <Typography>{ comment.content }</Typography>
  </Stack>
}
