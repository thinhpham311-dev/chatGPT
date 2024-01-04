'use client'
import React from 'react'
import Image from 'next/image'
import { HeaderWrapper } from './styles'
import { Button } from "@/components"
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from "react-icons/ai";
import { useSelector, useDispatch } from 'react-redux';
import { modalState$ } from '@/redux/selectors';
import { toggleModal } from '../../redux/actions';

const Header = () => {
    const dispatch = useDispatch();
    const { isShow } = useSelector(modalState$);
    const handleToggle = () => {
        dispatch(toggleModal());
    }

    return (
        <HeaderWrapper>
            <Button type="button" $isSmall onClick={handleToggle}>{isShow ? <AiOutlineMenuUnfold size={25} /> : <AiOutlineMenuFold size={25} />}</Button>

        </HeaderWrapper>
    )
}

export default Header
