'use client'

import {IconButton, Sheet, Typography} from '@mui/joy'
import {useCallback, useState} from 'react'
import {VoteDelta} from '@/data/IVote'
import KeyboardArrowDownRounded from '@mui-symbols-material/w400/KeyboardArrowDownRounded'
import KeyboardArrowUpRounded from '@mui-symbols-material/w400/KeyboardArrowUpRounded'

export const Voter = ({
    size = 'md', vote, voteDelta, id, count
  }: {
    size?: 'sm' | 'md', vote: (t: string, delta: VoteDelta) => Promise<void>, voteDelta: number, id: string, count: number
  }
) => {
  const [voting, setVoting] = useState(false)
  // const [count, setCount] = useState(originalCount)

  const handleVote = useCallback((delta: VoteDelta) => {
    setVoting(true)
    if (delta == voteDelta) { // Selected the same vote option again, should deselect instead
      delta = 0
    }
    console.log('Voting:', delta)
    vote(id, delta)
      .finally(() => setVoting(false))
  }, [id, vote, voteDelta, setVoting])

  const color = voteDelta == 1 ? 'success' : voteDelta == -1 ? 'warning' : 'neutral'

  return <Sheet variant={'soft'}
    color={color}
    sx={{
      display: 'flex',
      alignItems: 'center',
      borderRadius: 100,
      gap: .5,
      '& button': {
        borderRadius: '50%',
        transition: 'background .2s ease-out'
      },
      transition: 'background .2s ease-out'
    }}
  >
    <IconButton variant={'soft'} color={color} size={size} disabled={voting} onClick={() => handleVote(1)}>
      <KeyboardArrowUpRounded />
    </IconButton>
    <Typography>{count}</Typography>
    <IconButton variant={'soft'} color={color} size={size} disabled={voting} onClick={() => handleVote(-1)}>
      <KeyboardArrowDownRounded />
    </IconButton>
  </Sheet>
}
