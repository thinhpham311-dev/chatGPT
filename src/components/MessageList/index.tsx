'use client'
import React, { useEffect } from 'react'
import { Loading, Card } from "@/components"
import { MessageListWrapper } from './styles'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { getMessageChatsList } from '@/redux/store/slices/messageSlice'
import { useDispatch } from 'react-redux'
import { Message } from '@prisma/client'

const MessageList = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { messageChats, loadingAction } = useAppSelector((state) => state.messageChatsState)
    const { conversationId } = useAppSelector((state) => state.conversationsState)

    useEffect(() => {
        dispatch(getMessageChatsList())
    }, [dispatch])


    return (
        <MessageListWrapper>
            <div className="messageList-inner">
                <ul className="messageList-inner--content">
                    {
                        !loadingAction ?
                            conversationId && messageChats?.filter((item) => item.conversationId === conversationId).map((item) => {
                                return (
                                    <li>
                                        <Card message={item} isBot />
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
