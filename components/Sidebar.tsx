'use client'

import {Box, List, ListItem, ListItemButton} from '@mui/joy'
import {usePathname} from 'next/navigation'
import NextLink from 'next/link'

export const Sidebar = () => {
  const pathname = usePathname()

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
    <ListItem>
      <ListItemButton selected={pathname == '/'} href={'/'} component={NextLink}>Home</ListItemButton>
    </ListItem>
    <Box flex={1}/>
    <ListItem>
      <ListItemButton selected={pathname.startsWith('/user')}>User</ListItemButton>
    </ListItem>
  </List>
}
