import {Box, Card, CardContent, Chip, Link, Stack, Typography} from "@mui/joy";
import NextLink from "next/link";
import {Voter} from '@/components/post/Voter'
import {formatDistanceToNow} from 'date-fns'
import {QueryPost} from '@/data/postActions'
import {updateVote} from '@/data/voteActions'
import Image from 'next/image'

export default function PostCard({ post }: { post: QueryPost }) {
  return <Card sx={{
    '&:hover': {
      boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder'
    },
    transition: 'box-shadow .2s ease-out'
  }}>
    <CardContent>
      <Typography level={'body-xs'}>
        <Typography fontWeight={'lg'} component={'span'}>{ post.username }</Typography>
        &nbsp;&bull; {formatDistanceToNow(post.at, { addSuffix: true })}
      </Typography>
      <Typography level={'title-lg'}>
        <Link component={NextLink} overlay href={`/posts/${post._id.toString()}`}>{post.title}</Link>
      </Typography>
      { post.imageURL && <Box sx={{
        width: '100%', display: 'flex', my: 1,
        boxShadow: 'md',
        borderRadius: 'md',
        '& > img': {
          width: '100%',
          height: 'auto',
          borderRadius: 'md',
        }
      }}>
        <Image src={post.imageURL} alt={''} width={1024} height={1024} unoptimized />
      </Box>}
      <Typography level={'body-sm'} textColor={'text.tertiary'} sx={{
        display: '-webkit-box',
        WebkitLineClamp: '4',
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
      }}>
        {post.content}
      </Typography>
      <Stack direction={'row'} mt={1} spacing={1.5}>
        <Voter size={'sm'} vote={updateVote} voteDelta={post.userVote ?? 0} count={post.voteCount} id={post._id.toHexString()} />
        { post.score && <Chip sx={{ color: 'text.secondary' }}>{ (post.score*100).toFixed(1) }%</Chip> }
      </Stack>
    </CardContent>
  </Card>
}
