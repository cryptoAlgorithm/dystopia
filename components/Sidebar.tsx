'use client'

import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemDecorator,
  ListSubheader,
  Theme
} from '@mui/joy'
import {usePathname} from 'next/navigation'
import NextLink from 'next/link'
import {ReactElement, ReactNode, useState} from 'react'
import AddRounded from '@mui-symbols-material/w400/AddRounded'
import HomeRounded from '@mui-symbols-material/w400/HomeRounded'
import PersonRounded from '@mui-symbols-material/w400/PersonRounded'
import Robot_2Rounded from '@mui-symbols-material/w400/Robot_2Rounded'
import SettingsRounded from '@mui-symbols-material/w400/SettingsRounded'
import {useMediaQuery} from '@mui/system'
import MenuRounded from '@mui-symbols-material/w400/MenuRounded'

const SelectableLinkButton = ({ icon, path, children }: { icon: ReactElement, path: string, children: ReactNode }) => {
  const pathname = usePathname()

  return <ListItem>
    <ListItemButton selected={pathname == path} href={path} component={NextLink}>
      <ListItemDecorator>{ icon }</ListItemDecorator>
      { children }
    </ListItemButton>
  </ListItem>
}

const SidebarContents = () => <List size={'lg'} component={'nav'} sx={{
  width: '100%',
  flexShrink: 0,
  overflow: 'auto',
  height: '100%',
  pr: 2,
  py: 2,
  '& .MuiListItemButton-root': {
    borderTopRightRadius: 'var(--List-radius)',
    borderBottomRightRadius: 'var(--List-radius)'
  },
  '--List-radius': '8px'
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

export const Sidebar = () => {
  const small = useMediaQuery((t: Theme) => t.breakpoints.down('sm'))
  const [drawerOpen, setDrawerOpen] = useState(false)

  return small
    ? <>
      <IconButton variant={'outlined'} onClick={() => setDrawerOpen(true)}
                  sx={{ position: 'fixed', top: 9, left: 9, zIndex: 101 }}>
        <MenuRounded />
      </IconButton>
      <Drawer size={'sm'} open={drawerOpen} onClose={() => setDrawerOpen(false)}><SidebarContents /></Drawer>
    </>
    : <Box pl={'260px'} display={{ xs: 'none', sm: 'block' }}>
      <Box
        sx={{
          width: 260,
          position: 'fixed', left: 0,
          pt: '54px',
          height: '100vh',
          border: '1px solid var(--joy-palette-divider)', borderWidth: '0 1px 0 0'
        }}
      >
        <SidebarContents />
      </Box>
    </Box>
}
