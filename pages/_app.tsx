import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { myTheme } from '@/styles/theme'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import StyledComponentsRegistry from '@/lib/registry';
import { Analytics } from '@vercel/analytics/react';
import { Notification } from '@/components/onesignal'

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
          <>
            <Component {...pageProps} />
            <Analytics />
            <Notification />
          </>
        </StyledComponentsRegistry>
      </ThemeProvider>
    </SessionContextProvider>
  )
}
