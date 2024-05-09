"use client";

import GlobalFont from "@/styles/GlobalStyle";
import "./globals.css";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import Tabbar from "@/components/common/Tabbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <GlobalFont />
          {children}
          <Tabbar />
        </ThemeProvider>
      </body>
    </html>
  );
}
