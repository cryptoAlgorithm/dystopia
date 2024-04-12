'use client'

import {Box, List, ListItem, ListItemButton, ListItemDecorator, ListSubheader} from '@mui/joy'
import {usePathname} from 'next/navigation'
import NextLink from 'next/link'
import {MaterialSymbol, SymbolCodepoints} from 'react-material-symbols'
import {ReactNode} from 'react'

const SelectableLinkButton = ({ icon, path, children }: { icon: SymbolCodepoints, path: string, children: ReactNode }) => {
  const pathname = usePathname()

  return <ListItem>
    <ListItemButton selected={pathname == path} href={path} component={NextLink}>
      <ListItemDecorator><MaterialSymbol icon={icon} /></ListItemDecorator>
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
    <SelectableLinkButton icon={'home'} path={'/'}>Home</SelectableLinkButton>
    <SelectableLinkButton icon={'add'} path={'/post'}>Create Post</SelectableLinkButton>
    <Box flex={1}/>
    <ListItem nested>
      <ListSubheader>You</ListSubheader>
      <List>
        <SelectableLinkButton icon={'people'} path={'/users'}>Users</SelectableLinkButton>
        <SelectableLinkButton icon={'settings'} path={'/users/me/settings'}>Settings</SelectableLinkButton>
      </List>
    </ListItem>
  </List>
}
