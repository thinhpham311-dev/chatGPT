'use client'
import React, { useEffect, useRef } from 'react'
import { FooterWrapper } from './styles'
import { Input, Button, Loading } from '@/components'
import { IoIosSend } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { postAddMessageChat } from '@/redux/store/slices/messageSlice';
import { postAddMessageChatBot } from '@/redux/store/slices/messagebotSlice'
import { getConversationByCode } from '@/redux/store/slices/conversationSlice'
import { handleEnterInput } from '@/redux/store/slices/stateSlice'
import { AppDispatch, useAppSelector } from '@/redux/store';
import { Conversation, Message } from '@prisma/client';
import { useParams } from 'next/navigation';


const Footer = () => {
    const inputRef = useRef<HTMLInputElement>(null)
    const { code } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const { input } = useAppSelector((state) => state.stateSlice)
    const { loadingAction } = useAppSelector((state) => state.messageChatsState)
    const { conversationId, loadingFirst, loadingList } = useAppSelector((state) => state.conversationsState)


    useEffect(() => {
        dispatch(getConversationByCode({ code } as Conversation))
    }, [dispatch, code])

    const handleSendMessage = (e: any) => {
        e.preventDefault()

        if (conversationId) {
            dispatch(postAddMessageChat(
                {
                    content: input.trim(),
                    isbot: false,
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
                <Input ref={inputRef} disabled={loadingFirst || loadingAction || loadingList} type="text" onChange={handleEnterMessage} value={input} placeholder='Message ChatGPT Demo...' $outline="dark" $isFull />
                <div className='footer-inner--btn'>
                    <Button type="submit" $variant='system' $isSmall disabled={!input.trim()}>{!loadingAction ? <IoIosSend size={25} /> : <Loading color="light" isIcon />}</Button>
                </div>
            </form>
        </FooterWrapper>
    )
}

export default Footer
