import { Metadata } from 'next'
import React from 'react'
import Profile from './Profile';

export const metadata:Metadata = {
  title: "Next.js Profile | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Profile page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const Page = () => {
  return <Profile/>
}

export default Page
