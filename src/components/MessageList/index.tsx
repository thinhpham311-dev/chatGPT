'use client'
import React, { useEffect } from 'react'
import { Loading, Card } from "@/components"
import { MessageListWrapper } from './styles'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { getMessageChatsList } from '@/redux/store/slices/messageSlice'
import { getConversationByCode } from '@/redux/store/slices/conversationSlice'
import { useDispatch } from 'react-redux'
import { useParams } from 'next/navigation'
import { Conversation } from '@prisma/client'


const MessageList = () => {
    const { code } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const { messageChats } = useAppSelector((state) => state.messageChatsState)
    const { conversationId, loadingFirst } = useAppSelector((state) => state.conversationsState)


    useEffect(() => {
        dispatch(getMessageChatsList())
        dispatch(getConversationByCode({ code } as Conversation))
    }, [dispatch])


    return (
        <MessageListWrapper>
            <div className="messageList-inner">
                <ul className="messageList-inner--content">
                    {
                        !loadingFirst ?
                            conversationId && messageChats?.filter((item) => item.conversationId === conversationId).reverse().map((item) => {
                                return (
                                    <li key={item.id}>
                                        <Card message={item} isBot={item.status} />
                                    </li>
                                )
                            }) : <Loading color="light" />
                    }
                </ul>
            </div>
        </MessageListWrapper>
    )
}

export default MessageList
