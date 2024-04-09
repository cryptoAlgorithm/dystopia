import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {CssBaseline, CssVarsProvider, GlobalStyles} from "@mui/joy";
import 'react-material-symbols/rounded';

const inter = Inter({ subsets: ["latin"] });

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
    <html lang='en' data-joy-color-scheme={'dark'}>
      <body className={inter.className}>
      <CssVarsProvider>
        <CssBaseline />
        <GlobalStyles styles={{
          '.material-symbols': {
            color: 'var(--Icon-color)',
            margin: 'var(--Icon-margin)',
            fontSize: 'var(--Icon-fontSize, 20px)!important',
            width: '1em',
            height: '1em'
          },
          html: {
            scrollBehavior: 'smooth'
          }
        }} />
        {children}
      </CssVarsProvider>
      </body>
    </html>
  );
}
