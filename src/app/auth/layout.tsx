"use client"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

export default function AuthLayout({children}:{children:React.ReactNode}) {
  // const { data: session, status } = useSession();
  // const router = useRouter();
  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.push("/auth/signin");
  //   } else {
  //     router.push("/");
  //   }
  // }, [router, status]);
  return (
    <div className='min-h-screen flex items-center justify-center'>
        {children}
    </div>
  )
}
