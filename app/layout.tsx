import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import {GlobalStyles} from '@mui/joy';
import ThemeRegistry from '@/components/ThemeRegistry'
import {getCookieTheme} from '@/util/colorScheme'

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
  const colorScheme = getCookieTheme()
  return (
    <html lang='en' data-joy-color-scheme={colorScheme}>
      <body className={inter.className}>
      <ThemeRegistry options={{ key: 'joy' }}>
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
