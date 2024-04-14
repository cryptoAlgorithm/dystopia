import {
  Container, FormControl, FormLabel, Typography,
} from "@mui/joy";
import {ThemePicker} from '@/app/(sidebar)/users/me/settings/_components/ThemePicker'

export default async function User() {
  return <Container maxWidth={'sm'} sx={{ py: 2 }}>
    <Typography level={'h2'} gutterBottom>Settings</Typography>
    <FormControl>
      <FormLabel>Interface Theme</FormLabel>
      <ThemePicker />
    </FormControl>
  </Container>
}
