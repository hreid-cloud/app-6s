'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

export function SignInButton() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <button
        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-gray-200 text-gray-600 gap-2 hover:bg-gray-300 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        disabled
      >
        Loading...
      </button>
    )
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {session.user.image && (
            <Image
              src={session.user.image}
              alt="Profile"
              width={32}
              height={32}
              className="rounded-full"
            />
          )}
          <span className="text-sm hidden sm:inline">{session.user.name}</span>
        </div>
        <button
          onClick={() => signOut()}
          className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-red-500 text-white gap-2 hover:bg-red-600 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        >
          Sign Out
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => signIn('google')}
      className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
    >
      <Image
        src="/google.svg"
        alt="Google"
        width={20}
        height={20}
        className="dark:invert"
      />
      Sign in with Google
    </button>
  )
} 