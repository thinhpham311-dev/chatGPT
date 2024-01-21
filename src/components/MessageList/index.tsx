'use client'
import React, { useEffect, useRef } from 'react'
import { Loading, Card } from "@/components"
import { MessageListWrapper } from './styles'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { getMessageChatsListByConversationCode } from '@/redux/store/slices/messageSlice'
import { useDispatch } from 'react-redux'
import { useParams } from 'next/navigation'
import { Message } from '@prisma/client'
import { useClerk } from '@clerk/nextjs'


const MessageList = () => {
    const { user } = useClerk()
    const { code } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const { messageChats, loadingAction, loadingList } = useAppSelector((state) => state.messageChatsState)

    useEffect(() => {
        if (code) {
            dispatch(getMessageChatsListByConversationCode({ conversationCode: code } as Message))
        }
    }, [dispatch, code])


    return (
        <MessageListWrapper >
            <div className="messageList-inner">
                <ul className="messageList-inner--content">
                    {
                        !loadingList ?
                            messageChats?.filter((item) => item.conversationCode === code && item.userId === user?.id).map((item) => {
                                return (
                                    <li key={item.id}>
                                        <Card message={{ ...item, content: item.content }} isBot={item.isbot} />
                                    </li>
                                )
                            }) : <Loading color="light" />
                    }
                    <li className="messageList-inner--content--loading">{!loadingList ? loadingAction && <Loading color="light" /> : <></>}</li>
                </ul>
            </div>
        </MessageListWrapper>
    )
}

export default MessageList
