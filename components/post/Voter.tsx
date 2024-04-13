'use client'

import {IconButton, Sheet, Stack, Typography} from '@mui/joy'
import {MaterialSymbol} from 'react-material-symbols'
import {useCallback, useState} from 'react'
import {VoteDelta} from '@/data/IVote'

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
      <MaterialSymbol icon={'keyboard_arrow_up'} />
    </IconButton>
    <Typography>{count}</Typography>
    <IconButton variant={'soft'} size={size} disabled={voting} onClick={() => handleVote(-1)}>
      <MaterialSymbol icon={'keyboard_arrow_down'} />
    </IconButton>
  </Stack>
}
