import ReactDOM from 'react-dom/client'
import Router from "@/router.tsx";
import {NextUIProvider} from "@nextui-org/react";
import React from 'react';
import {ThemeProvider as NextThemesProvider} from "next-themes";
import {Provider} from "react-redux";
import {store} from "@/store/store.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <Provider store={store}>
          <Router />
        </Provider>
      </NextThemesProvider>
    </NextUIProvider>
  </React.StrictMode>,
)