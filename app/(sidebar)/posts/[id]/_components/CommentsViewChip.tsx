import { Chip } from "@mui/joy"
import {MaterialSymbol} from 'react-material-symbols'

export const CommentsViewChip = ({ numComments }: { numComments: number }) => {
  return <Chip startDecorator={<MaterialSymbol icon={'comment'} />} size={'lg'}
               slotProps={{ action: { component: 'a', href: '#comments' } }}>
    { numComments }
  </Chip>
}