import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {CssBaseline, CssVarsProvider} from "@mui/joy";

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
    <html lang="en">
      <body className={inter.className}>
      <CssVarsProvider>
        <CssBaseline />
        {children}
      </CssVarsProvider>
      </body>
    </html>
  );
}
