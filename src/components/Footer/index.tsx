'use client'
import React, { useState, useRef, useEffect, useCallback } from 'react'
import { FooterWrapper } from './styles'
import { Input, Button, Loading } from '@/components'
import { IoIosSend } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { postAddMessageChat } from '@/redux/store/slices/messageSlice';
import { handleEnterInput } from '@/redux/store/slices/stateSlice'
import { AppDispatch, useAppSelector } from '@/redux/store';
import { Message } from '@prisma/client';


const Footer = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { input } = useAppSelector((state) => state.stateSlice)
    const { loadingAction } = useAppSelector((state) => state.messageChatsState)
    const { conversationId } = useAppSelector((state) => state.conversationsState)

    const handleSendMessage = (e: any) => {
        e.preventDefault()
        if (conversationId) {
            dispatch(postAddMessageChat(
                {
                    content: input.trim(),
                    status: false,
                    conversationId
                } as Message
            ))
        }
        dispatch(handleEnterInput(""))
    }

    const handleEnterMessage = (e: any) => {
        dispatch(handleEnterInput(e.target.value))
    }


    return (
        <FooterWrapper>
            <form onSubmit={handleSendMessage} className="footer-inner">
                <Input type="text" onChange={handleEnterMessage} value={input} placeholder='Message ChatGPT Demo...' $outline="dark" $isFull />
                <div className='footer-inner--btn'>
                    <Button type="submit" $variant='system' $isSmall disabled={!input.trim()}>{!loadingAction ? <IoIosSend size={25} /> : <Loading color="light" isIcon />}</Button>
                </div>
            </form>
        </FooterWrapper>
    )
}

export default Footer
