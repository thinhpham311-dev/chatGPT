'use client'
import React from 'react'
import Image from 'next/image'
import { HeaderWrapper } from './styles'
import { Button } from "@/components"
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from "react-icons/ai";
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/redux/store'
import { AppDispatch } from '@/redux/store'
import { toggleLayout } from '@/redux/store/slices/stateSlice'


const Header = () => {
    const dispatch = useDispatch<AppDispatch>()

    const { isShow } = useAppSelector(state => state.stateSlice)

    const handleToggle = () => {
        dispatch(toggleLayout());
    }

    return (
        <HeaderWrapper>
            <Button type="button" $isSmall onClick={handleToggle}>{isShow ? <AiOutlineMenuUnfold size={25} /> : <AiOutlineMenuFold size={25} />}</Button>
        </HeaderWrapper>
    )
}

export default Header
