'use client'
import React, { ReactNode } from 'react'
import { ContextWrapper } from './styles'

interface contextProps {
    children?: ReactNode
}

const Context = ({ children }: contextProps) => {

    return (
        <ContextWrapper >
            {children}
        </ContextWrapper>
    )
}

export default Context
