'use client'
import React, { ReactNode } from 'react'
import { ContextWrapper } from './styles'
import { Header, Footer } from '@/components'

interface contextProps {
    children?: ReactNode
}

const Context = ({ children }: contextProps) => {

    return (
        <ContextWrapper >
            <Header />
            {children}
            <Footer />
        </ContextWrapper>
    )
}

export default Context
