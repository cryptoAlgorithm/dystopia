import { Chip } from "@mui/joy"
import CommentRounded from '@mui-symbols-material/w400/CommentRounded'

export const CommentsViewChip = ({ numComments }: { numComments: number }) => {
  return <Chip startDecorator={<CommentRounded />} size={'lg'}
               slotProps={{ action: { component: 'a', href: '#comments' } }}>
    { numComments }
  </Chip>
}