'use client'
import React from 'react'

import { MessageListWrapper } from './styles'


const MessageList = () => (
    <MessageListWrapper>
        <div className="messageList-inner">
            <ul className="messageList-inner-suggest">
                <li></li>
            </ul>
        </div>
    </MessageListWrapper>
)

export default MessageList
