'use client'
import React from 'react'
import { FooterWrapper } from './styles'
import { Textarea, Button, Loading } from '@/components'
import { IoIosSend } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { postAddMessageChat } from '@/redux/store/slices/messageSlice';
import { postAddConversation } from '@/redux/store/slices/conversationSlice'
import { handleEnterSend } from '@/redux/store/slices/stateSlice'
import { AppDispatch, useAppSelector } from '@/redux/store';
import { Conversation, Message } from '@prisma/client';
import { useParams } from 'next/navigation';
import { useClerk } from '@clerk/nextjs';
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/navigation';


const Footer = () => {
    const router = useRouter()
    const { user } = useClerk()
    const { code } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const { inputSend } = useAppSelector((state) => state.stateSlice)
    const { loadingAction } = useAppSelector((state) => state.messageChatsState)
    const { loadingList } = useAppSelector((state) => state.conversationsState)


    const handleSendMessage = (e: any) => {
        e.preventDefault()
        const conversation = {
            userId: user?.id,
            code: uuidv4(),
            title: "New Messages",
        } as Conversation
        if (!code) {
            dispatch(postAddConversation(conversation))
            router.push(`/c/${conversation.code}`)
        }
        dispatch(postAddMessageChat(
            {
                userId: user?.id,
                content: inputSend.trim(),
                isbot: false,
                conversationCode: code ?? conversation.code
            } as Message
        ))
        dispatch(handleEnterSend(""))

    }

    const handleEnterMessage = (e: any) => {
        dispatch(handleEnterSend(e.target.value))
    }


    return (
        <FooterWrapper>
            <form onSubmit={handleSendMessage} className="footer-inner">
                <Textarea disabled={!loadingAction && !loadingList} onChange={handleEnterMessage} value={inputSend} placeholder='Message ChatGPT Demo...' $outline="dark" $isFull rows={1} />
                <div className='footer-inner--btn'>
                    <Button type="submit" $variant='system' $isSmall disabled={!inputSend.trim()}>{!loadingAction ? <IoIosSend size={25} /> : <Loading color="light" isIcon />}</Button>
                </div>
            </form>
        </FooterWrapper>
    )
}

export default Footer
