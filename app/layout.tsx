import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import {CssBaseline, GlobalStyles} from '@mui/joy';
import ThemeRegistry from '@/components/ThemeRegistry'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dystopia',
  description: 'An AI-powered social simulation',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
      <ThemeRegistry options={{ key: 'joy' }}>
        <CssBaseline />
        <GlobalStyles styles={{
          html: {
            scrollBehavior: 'smooth'
          }
        }} />
        {children}
      </ThemeRegistry>
      </body>
    </html>
  );
}
