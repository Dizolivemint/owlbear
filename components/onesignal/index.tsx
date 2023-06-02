import { supabase } from '@/lib/supabaseClient'
import React, { useEffect, useState } from 'react'
import OneSignal from 'react-onesignal'

const oneSignalAppId = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID

export const Notification = () => {

  const [oneSignalInitialized, setOneSignalInitialized] = useState<boolean>(false)

  /**
   * Initializes OneSignal SDK for a given Supabase User ID
   * @param uid Supabase User ID
   */
  const initializeOneSignal = async (uid: string) => {
    if (oneSignalInitialized) {
      return
    }
    setOneSignalInitialized(true)
    if (!oneSignalAppId) {
      return
    }
    await OneSignal.init({
      appId: oneSignalAppId,
      autoResubscribe: true,
      notifyButton: {
        enable: true,
      },
      allowLocalhostAsSecureOrigin: true,
      path: '/service-worker.js'
    })

    OneSignal.showSlidedownPrompt()

    await OneSignal.setExternalUserId(uid)
  }

  useEffect(() => {
    const initialize = async () => {
      const initialUser = (await supabase.auth.getUser())?.data.user
      if (initialUser) {
        initializeOneSignal(initialUser.id)
      }
    }

    initialize()

    const authListener = supabase.auth.onAuthStateChange(async (event, session) => {
      const user = session?.user ?? null
      if (user) {
        initializeOneSignal(user.id)
      }
    })

    return () => {
      authListener.data.subscription.unsubscribe()
    }
  }, [])

  

  useEffect(() => {
    console.log('onesignal inited?', oneSignalInitialized)
    const getUserId = async () => {
      const result = await OneSignal.getExternalUserId()
      console.log('onesignal user id', result)
    }

    if (oneSignalInitialized) {
      getUserId()
    }
    
  }, [oneSignalInitialized])
    
  return <></>
}