'use client'

import {Select, Option} from '@mui/joy'
import {SupportedColorScheme} from '@mui/joy/styles/types/colorScheme'

export const ThemePicker = ({ setMode, mode }: { setMode: (mode: string) => Promise<void>, mode: SupportedColorScheme }) => {
  return <Select value={mode} onChange={(_, value) => value && setMode(value)} required>
    <Option value='dark'>Dark</Option>
    <Option value='light'>Light</Option>
  </Select>
}
