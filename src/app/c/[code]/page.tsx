'use client'
import React, { useEffect } from 'react'
import { MessageList } from "@/components"
import { useRouter, useParams } from 'next/navigation'
import { useAppSelector } from '@/redux/store'
import { Conversation } from '@prisma/client'

const MessageDetail = () => {

    const { id } = useParams()
    const router = useRouter()
    const { conversations } = useAppSelector((state) => state.conversationsState)

    useEffect(() => {
        const data: Conversation[] | undefined = conversations
        const conversation: any = data?.find((item) => item.code === id)
        if (conversations && conversations.length <= 0) {
            router.push("/")
        }
        if (conversation && conversation.code !== id) {
            router.push("/")
        }
    }, [conversations])


    return (
        <MessageList />
    )
}

export default MessageDetail


