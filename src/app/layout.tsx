"use client";

import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import GlobalStyles from "@/styles/GlobalStyle";
import NOSSR from "@/util/NOSSR";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

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
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            <NOSSR>{children}</NOSSR>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
