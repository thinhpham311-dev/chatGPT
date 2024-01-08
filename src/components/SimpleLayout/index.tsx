'use client'
import React from 'react'
import { Sidebar, Context, Header, Footer } from "@/components"
import { SimpleLayoutWrapper } from './styles'

const SimpleLayout = ({ children }: { children: React.ReactNode }) => (
    <SimpleLayoutWrapper >
        <Sidebar />
        <Context>
            <Header />
            {children}
            <Footer />
        </Context>
    </SimpleLayoutWrapper>
)

export default SimpleLayout


