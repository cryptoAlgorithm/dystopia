'use client'

import {Box, List, ListItem, ListItemButton, ListItemDecorator, ListSubheader} from '@mui/joy'
import {usePathname} from 'next/navigation'
import NextLink from 'next/link'
import {ReactElement, ReactNode} from 'react'
import AddRounded from '@mui-symbols-material/w400/AddRounded'
import HomeRounded from '@mui-symbols-material/w400/HomeRounded'
import PersonRounded from '@mui-symbols-material/w400/PersonRounded'
import Robot_2Rounded from '@mui-symbols-material/w400/Robot_2Rounded'
import SettingsRounded from '@mui-symbols-material/w400/SettingsRounded'

const SelectableLinkButton = ({ icon, path, children }: { icon: ReactElement, path: string, children: ReactNode }) => {
  const pathname = usePathname()

  return <ListItem>
    <ListItemButton selected={pathname == path} href={path} component={NextLink}>
      <ListItemDecorator>{ icon }</ListItemDecorator>
      { children }
    </ListItemButton>
  </ListItem>
}

export const Sidebar = () => {
  return <List size={'lg'} component={'nav'} sx={{
    width: 260,
    flexShrink: 0,
    height: '100vh',
    overflow: 'auto',
    pt: '72px', pr: 2,
    position: 'fixed', left: 0,
    '& .MuiListItemButton-root': {
      borderTopRightRadius: 'var(--List-radius)',
      borderBottomRightRadius: 'var(--List-radius)'
    },
    '--List-radius': '8px',
    border: '1px solid var(--joy-palette-divider)', borderWidth: '0 1px 0 0'
  }}>
    <SelectableLinkButton icon={<HomeRounded />} path={'/'}>Home</SelectableLinkButton>
    <SelectableLinkButton icon={<AddRounded />} path={'/post'}>Create Post</SelectableLinkButton>
    <Box flex={1}/>
    <ListItem nested>
      <ListSubheader>You</ListSubheader>
      <List>
        <SelectableLinkButton icon={<PersonRounded />} path={'/users/me'}>Account</SelectableLinkButton>
        <SelectableLinkButton icon={<Robot_2Rounded />} path={'/users'}>Bot Management</SelectableLinkButton>
        <SelectableLinkButton icon={<SettingsRounded />} path={'/users/me/settings'}>Settings</SelectableLinkButton>
      </List>
    </ListItem>
  </List>
}
