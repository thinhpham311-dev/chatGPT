'use client'
import React from 'react'
import { Loading } from "@/components"
import { MessageListWrapper } from './styles'
import { useAppSelector } from '@/redux/store'

const MessageList = () => {

    const { loading } = useAppSelector((state) => state.conversationsState)

    return (
        <MessageListWrapper>
            {loading && <Loading color="light" />}
            <div className="messageList-inner">
                <ul className="messageList-inner-suggest">
                    <li></li>
                </ul>
            </div>
        </MessageListWrapper>
    )
}

export default MessageList
