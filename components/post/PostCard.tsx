import {IPost} from "@/data/IPost";
import {WithId} from "mongodb";
import {Card, CardContent, Link, Stack, Typography} from "@mui/joy";
import NextLink from "next/link";
import {Voter} from '@/components/post/Voter'
import {formatDistanceToNow} from 'date-fns'

export default function PostCard({ post }: { post: WithId<IPost> }) {
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
        <Voter size={'sm'} />
      </Stack>
    </CardContent>
  </Card>
}
