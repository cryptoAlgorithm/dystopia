import {Stack} from "@mui/joy";
import Toolbar from "@/components/Toolbar";
import {Sidebar} from '@/components/Sidebar'

export default function FeedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>
    <Toolbar />
    <Stack direction={'row'}>
      <Sidebar />
      <main style={{paddingTop: 64, paddingLeft: 260, minHeight: '100vh', flex: 1}}>
        {children}
      </main>
    </Stack>
  </>
}
