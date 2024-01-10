'use client'
import React, { useEffect } from 'react'
import { Sidebar, Context } from "@/components"
import { SimpleLayoutWrapper } from './styles'
import { useAppSelector } from "@/redux/store";
import { Conversation } from "@prisma/client";
import { useParams, usePathname, useRouter } from "next/navigation";


const SimpleLayout = ({ children }: { children: React.ReactNode }) => {
    // const pathname = usePathname()
    // const { code } = useParams()
    // const router = useRouter()
    // const { conversations } = useAppSelector((state) => state.conversationsState)

    // useEffect(() => {
    //     const data: Conversation[] | undefined = conversations
    //     const conversation: any = data?.find((item) => item.code === code)

    //     if (conversation || pathname === "/c") {
    //         router.push("/")
    //     }

    //     if (conversation && conversation.code !== code) {
    //         router.push("/")
    //     }

    // }, [conversations])

    return (
        <SimpleLayoutWrapper >
            <Sidebar />
            <Context>
                {children}
            </Context>
        </SimpleLayoutWrapper>
    )
}

export default SimpleLayout


