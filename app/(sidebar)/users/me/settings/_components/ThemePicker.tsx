'use client'

import {Select, Option, useColorScheme} from '@mui/joy'

export const ThemePicker = () => {
  const { mode, setMode } = useColorScheme()

  return <Select value={mode} onChange={(_, value) => setMode(value)}>
    <Option value='system'>Follow system</Option>
    <Option value='dark'>Dark</Option>
    <Option value='light'>Light</Option>
  </Select>
}
