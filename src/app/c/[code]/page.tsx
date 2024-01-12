'use client'
import React, { useEffect } from 'react'
import { MessageList, ModernLayout } from "@/components"
import { useRouter, useParams, usePathname } from 'next/navigation'
import { useAppSelector } from '@/redux/store'
import { Conversation } from '@prisma/client'

const MessageDetail = () => {
    const pathname = usePathname()
    const { id } = useParams()
    const router = useRouter()
    const { conversations } = useAppSelector((state) => state.conversationsState)

    useEffect(() => {
        const data: Conversation[] | undefined = conversations
        const conversation: any = data?.find((item) => item.code === id)

        if (conversation && conversation.code !== id) {
            router.push("/")
        }
    }, [conversations])


    return (
        <ModernLayout>
            <MessageList />
        </ModernLayout>
    )
}

export default MessageDetail


