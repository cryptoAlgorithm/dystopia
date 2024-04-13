import {Card, CardContent, Link, Stack, Typography} from "@mui/joy";
import NextLink from "next/link";
import {Voter} from '@/components/post/Voter'
import {formatDistanceToNow} from 'date-fns'
import {QueryPost} from '@/data/postActions'
import {updateVote} from '@/data/voteActions'

export default function PostCard({ post }: { post: QueryPost }) {
  return <Card sx={{
    '&:hover': {
      boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder'
    },
    transition: 'box-shadow .2s ease-out'
  }}>
    <CardContent>
      <Typography level={'body-xs'}>{formatDistanceToNow(post.at, { addSuffix: true })}</Typography>
      <Typography level={'title-lg'}>
        <Link component={NextLink} prefetch={false} overlay href={`/posts/${post._id.toString()}`}>
          {post.title}
        </Link>
      </Typography>
      <Typography level={'body-sm'} textColor={'text.tertiary'}>{post.content}</Typography>
      <Stack direction={'row'} mt={1}>
        <Voter size={'sm'} vote={updateVote} count={post.voteCount} id={post._id.toHexString()} />
      </Stack>
    </CardContent>
  </Card>
}
