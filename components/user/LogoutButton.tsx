'use client'

import {MenuItem} from '@mui/joy'
import {removeSession} from '@/util/session/sessionActions'
import {useState} from 'react'

export const LogoutButton = () => {
  const [loggingOut, setLoggingOut] = useState(false)
  return <MenuItem color={'danger'} disabled={loggingOut} onClick={async () => {
    setLoggingOut(true)
    await removeSession()
  }}>
    Logout
  </MenuItem>
}