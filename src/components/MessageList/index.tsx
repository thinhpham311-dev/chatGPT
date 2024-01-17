'use client'
import React, { useEffect, useRef } from 'react'
import { Loading, Card } from "@/components"
import { MessageListWrapper } from './styles'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { getMessageChatsList } from '@/redux/store/slices/messageSlice'
import { useDispatch } from 'react-redux'



const MessageList = () => {
    const messageListRef = useRef<HTMLDivElement>(null)
    const dispatch = useDispatch<AppDispatch>()
    const { messageChats } = useAppSelector((state) => state.messageChatsState)
    const { conversationId, loadingFirst, loadingAction } = useAppSelector((state) => state.conversationsState)

    useEffect(() => {
        dispatch(getMessageChatsList())
    }, [dispatch])



    return (
        <MessageListWrapper ref={messageListRef}>
            <div className="messageList-inner">
                <ul className="messageList-inner--content">
                    {
                        !loadingFirst && !loadingAction ?
                            conversationId && messageChats?.filter((item) => item.conversationId === conversationId).reverse().map((item) => {
                                return (
                                    <li key={item.id}>
                                        <Card message={{ ...item, content: item.content }} isBot={false} />
                                        <Card message={{ ...item, content: item.contentbot }} isBot={true} />
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
