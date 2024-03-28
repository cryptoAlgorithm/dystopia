import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {CssBaseline, CssVarsProvider} from "@mui/joy";
import Toolbar from "@/components/Toolbar";
import {cloneElement} from "react";

export default function FeedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>
    <Toolbar />
    <main style={{ paddingTop: 64, minHeight: '100vh' }}>
      {children}
    </main>
  </>
}
