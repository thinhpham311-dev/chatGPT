'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import { MessageListWrapper } from './styles'


const MessageList = () => {
    const { id } = useParams()


    return (
        <MessageListWrapper>
            <div className="messageList-inner">
                <ul className="messageList-inner-suggest">
                    <li></li>
                </ul>
            </div>
        </MessageListWrapper>
    )
}

export default MessageList
