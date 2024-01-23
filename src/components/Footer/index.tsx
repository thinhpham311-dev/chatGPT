'use client'
import React, { useRef } from 'react'
import { FooterWrapper } from './styles'
import { Textarea, Button, Loading } from '@/components'
import { IoIosSend } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { postAddMessageChat, postAddMessageChatBot, getMessageChatsListByConversationCode } from '@/redux/store/slices/messageSlice';
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
    const { loadingMessage } = useAppSelector((state) => state.messageChatsState)


    const handleSendMessage = (e: any) => {
        e.preventDefault()
        const conversation = {
            userId: user?.id,
            code: uuidv4(),
            title: "New Messages",
        } as Conversation
        const message = {
            userId: user?.id,
            content: inputSend.trim(),
            conversationCode: code ?? conversation.code
        } as Message
        if (!code) {
            dispatch(postAddConversation(conversation))
            router.push(`/c/${conversation.code}`)
        }

        dispatch(postAddMessageChat({ ...message }))
        dispatch(postAddMessageChatBot({ ...message }))
        dispatch(handleEnterSend(""))
    }


    const handleEnterMessage = (e: any) => {
        dispatch(handleEnterSend(e.target.value))
    }

    const getCaret = (el: any) => {
        if (el.selectionStart) {
            return el.selectionStart;
        } else if (document.getSelection()) {
            el.focus();

            const r = document.getSelection()?.addRange;
            if (r === null) {
                return 0;
            }

            const re = el.createTextRange(),
                rc = re.duplicate();

            rc.setEndPoint('EndToStart', re);

            return rc.text.length;
        }
        return 0;
    };

    const handleTextareaChange = (e: any) => {
        if (e.keyCode === 13 && e.shiftKey) {
            e.preventDefault();
            const content = inputSend;
            const caret = getCaret(e.target);
            dispatch(handleEnterSend(
                content.substring(0, caret) + '\n' + content.substring(caret))
            );

            e.stopPropagation();
        } else if (e.keyCode === 13) {
            e.preventDefault();
            handleSendMessage(e)
        }
    };


    return (
        <FooterWrapper>
            <form onSubmit={handleSendMessage} className="footer-inner">
                <Textarea disabled={loadingMessage} onKeyDown={handleTextareaChange} onChange={handleEnterMessage} value={inputSend} placeholder='Message ChatGPT Demo...' $outline="dark" $isFull rows={1} />
                <div className='footer-inner--btn'>
                    {!loadingMessage ? <Button type="submit" $variant='system' $isSmall disabled={!inputSend.trim()}> <IoIosSend size={25} /></Button> : <Loading color="light" isIcon />}
                </div>
            </form>
        </FooterWrapper>
    )
}

export default Footer
