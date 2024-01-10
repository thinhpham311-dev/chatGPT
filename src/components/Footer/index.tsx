'use client'
import React, { useState, useRef } from 'react'
import { FooterWrapper } from './styles'
import { Input, Button, Loading } from '@/components'
import { IoIosSend } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { postAddMessageChat } from '@/redux/store/slices/messageSlice';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { Message } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid'
import { Conversation } from '@prisma/client';
import { postAddConversation } from '@/redux/store/slices/conversationSlice'

const Footer = () => {
    const router = useRouter()
    const [message, setMessage] = useState<string>("")
    const dispatch = useDispatch<AppDispatch>()
    const { loadingAction } = useAppSelector((state) => state.messageChatsState)
    const { conversationId } = useAppSelector((state) => state.conversationsState)

    const handleSendMessage = (e: any) => {
        e.preventDefault()
        if (conversationId) {
            dispatch(postAddMessageChat(
                {
                    content: message,
                    status: true,
                    userId: 1,
                    conversationId
                } as Message
            ))
        }
    }

    const handleEnterMessage = (e: any) => {
        setMessage(e.target.value)
    }

    return (
        <FooterWrapper>
            <form onSubmit={handleSendMessage} className="footer-inner">
                <Input type="text" onChange={handleEnterMessage} placeholder='Message ChatGPT Demo...' $outline="dark" $isFull />
                <div className='footer-inner--btn'>
                    <Button type="submit" $variant='system' $isSmall disabled={!message}>{!loadingAction ? <IoIosSend size={25} /> : <Loading color="light" isIcon />}</Button>
                </div>
            </form>
        </FooterWrapper>
    )
}

export default Footer
