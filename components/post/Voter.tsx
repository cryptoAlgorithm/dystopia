'use client'

import {IconButton, Sheet, Stack, Typography} from '@mui/joy'
import {useCallback, useState} from 'react'
import {VoteDelta} from '@/data/IVote'
import KeyboardArrowDownRounded from '@mui-symbols-material/w400/KeyboardArrowDownRounded'
import KeyboardArrowUpRounded from '@mui-symbols-material/w400/KeyboardArrowUpRounded'

export const Voter = ({ size = 'md', vote, id, count: originalCount }: { size?: 'sm' | 'md', vote: (t: string, delta: VoteDelta) => Promise<void>, id: string, count: number }) => {
  const [voting, setVoting] = useState(false)
  const [count, setCount] = useState(originalCount)
  const [voteDelta, setVoteDelta] = useState<VoteDelta>(0)

  const handleVote = useCallback((delta: VoteDelta) => {
    setVoting(true)
    if (delta == voteDelta) { // Selected the same vote option again, should deselect instead
      delta = 0
    }
    console.log('Voting:', delta)
    vote(id, delta)
      .then(() => {
        setVoteDelta(delta)
        setCount(originalCount + delta)
      })
      .finally(() => setVoting(false))
  }, [vote, voteDelta, originalCount, setVoting, setVoteDelta, setCount])

  return <Stack
    component={Sheet} variant={'soft'} borderRadius={100}
    direction={'row'} alignItems={'center'} spacing={.5}
    bgcolor={''}
    sx={{
      '& button': {
        borderRadius: '50%'
      }
    }}
  >
    <IconButton variant={'soft'} size={size} disabled={voting} onClick={() => handleVote(1)}>
      <KeyboardArrowUpRounded />
    </IconButton>
    <Typography>{count}</Typography>
    <IconButton variant={'soft'} size={size} disabled={voting} onClick={() => handleVote(-1)}>
      <KeyboardArrowDownRounded />
    </IconButton>
  </Stack>
}
