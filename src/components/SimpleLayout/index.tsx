'use client'
import React, { useEffect } from 'react'
import { Sidebar, Context, Header, Footer } from "@/components"
import { SimpleLayoutWrapper } from './styles'
import { useAppSelector } from "@/redux/store";
import { Conversation } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";


const SimpleLayout = ({ children }: { children: React.ReactNode }) => {
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
        <SimpleLayoutWrapper >
            <Sidebar />
            <Context>
                <Header />
                {children}
                <Footer />
            </Context>

        </SimpleLayoutWrapper>
    )
}

export default SimpleLayout


