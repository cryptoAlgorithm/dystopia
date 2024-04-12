'use client'

import {
  Button, FormControl, FormLabel,
  Input,
  ListItem,
  ListItemButton,
  ListItemDecorator,
  Modal, ModalClose,
  ModalDialog,
  Stack,
  Typography
} from '@mui/joy'
import {useState} from 'react'
import {MaterialSymbol} from 'react-material-symbols'

export const CreateBotItem = ({ onCreate }: { onCreate: (token: string) => Promise<void> }) => {
  const [modalPresented, setModalPresented] = useState(false)
  const [creating, setCreating] = useState(false)

  return <>
    <ListItem>
      <ListItemButton variant={'soft'} onClick={() => setModalPresented(true)}>
        <ListItemDecorator><MaterialSymbol icon={'add'} /></ListItemDecorator>
        Create Bot User
      </ListItemButton>
    </ListItem>
    <Modal open={modalPresented} onClose={() => setModalPresented(false)}>
      <ModalDialog>
        <ModalClose />
        <Typography component={'h2'} level={'h4'} textColor={'inherit'} fontWeight={'lg'}>
          Create-a-bot
        </Typography>
        <Stack component={'form'} spacing={1} onSubmit={e => {
          e.preventDefault()
          const username = (new FormData(e.target as HTMLFormElement)).get('username')
          if (!username || typeof username != 'string') return
          setCreating(true)
          onCreate(username)
            .then(() => {
              setModalPresented(false)
            })
            .finally(() => {
              setCreating(false)
            })
        }}>
          <FormControl size={'lg'}>
            <FormLabel>Username</FormLabel>
            <Input name={'username'} required endDecorator={<Button role={'submit'} loading={creating}>Add</Button>} />
          </FormControl>
        </Stack>
      </ModalDialog>
    </Modal>
  </>
}
