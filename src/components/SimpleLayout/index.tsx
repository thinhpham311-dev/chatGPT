'use client'
import React, { useEffect } from 'react'
import { Sidebar, Context, Header, Footer, Loading } from "@/components"
import { SimpleLayoutWrapper } from './styles'
import { useAppSelector, AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { getConversationById } from "@/redux/store/slices/conversationSlice";
import { Conversation } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";


const SimpleLayout = ({ children }: { children: React.ReactNode }) => {
    const { id } = useParams()
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()

    const { conversation } = useAppSelector((state) => state.conversationState)

    useEffect(() => {
        if (id) {
            dispatch(getConversationById({ code: id } as Conversation))
        } else {
            router.push('/')
        }
    }, [dispatch, id])

    useEffect(() => {
        const data: Conversation | null = conversation
        if (id !== data?.code) {
            router.push("/")
        }
    }, [conversation])
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


