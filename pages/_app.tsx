import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { myTheme } from '@/styles/theme'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import StyledComponentsRegistry from '@/lib/registry';

export default function App({ Component, pageProps }: AppProps<{
  initialSession: Session
}>) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())
  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <ThemeProvider theme={myTheme}>
        <StyledComponentsRegistry>
          <Component {...pageProps} />
        </StyledComponentsRegistry>
      </ThemeProvider>
    </SessionContextProvider>
  )
}
