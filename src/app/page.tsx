'use client'
import React, { useEffect } from 'react'
import { SimpleLayout, MessageList } from "@/components"
import tw, { styled, css, theme } from 'twin.macro'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

const Home = () => {



  return (
    <MessageList />
  )
}

export default Home
