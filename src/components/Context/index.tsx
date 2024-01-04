'use client'
import React, { ReactNode } from 'react'
import { ContextWrapper } from './styles'
import { useSelector } from 'react-redux';
import { modalState$ } from '@/redux/selectors';

interface contextProps {
    children?: ReactNode
}

const Context = ({ children }: contextProps) => {
    const { isShow } = useSelector(modalState$);
    return (
        <ContextWrapper $isShow={isShow}>
            {children}
        </ContextWrapper>
    )
}

export default Context
