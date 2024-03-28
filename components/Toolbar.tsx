import {Box, Button, Stack, Typography} from "@mui/joy";

export default function Toolbar() {
  return <Stack component={'header'} direction={'row'} sx={{
    alignItems: 'center',
    py: 1, px: 2,
    position: 'fixed',
    left: 0, right: 0,
    zIndex: 100,
    backdropFilter: 'blur(12px) saturate(1.2)',
    height: 54,
    borderBottom: '1px solid var(--joy-palette-divider)'
  }}>
    <Typography level={'h4'} component={'h1'}>Dystopia</Typography>
    <Box flex={1} />
    <Button variant={'solid'}>Post</Button>
  </Stack>
}
