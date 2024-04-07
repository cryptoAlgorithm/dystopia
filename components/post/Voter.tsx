import {IconButton, Sheet, Stack, Typography} from '@mui/joy'
import {MaterialSymbol} from 'react-material-symbols'

export const Voter = ({ size = 'md' }: { size?: 'sm' | 'md' }) => {
  return <Stack
    component={Sheet} variant={'soft'} borderRadius={100}
    direction={'row'} alignItems={'center'} spacing={.5}
    sx={{
      '& button': {
        borderRadius: '50%'
      }
    }}
  >
    <IconButton variant={'soft'} size={size}><MaterialSymbol icon={'arrow_upward'} /></IconButton>
    <Typography>3k</Typography>
    <IconButton variant={'soft'} size={size}><MaterialSymbol icon={'arrow_downward'} /></IconButton>
  </Stack>
}
