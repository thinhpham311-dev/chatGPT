'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components'
import { SidebarWrapper } from './styles'
import { IoSave, IoRocket, IoChatboxOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { SiPreact } from "react-icons/si";
import { CiLogout } from "react-icons/ci";
import { useDispatch } from 'react-redux'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { getConversationsList, postCreateConversation } from '@/redux/store/features/conversationSlice'
import { Conversation } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'

const Sidebar = () => {

    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const { isShow } = useAppSelector((state) => state.stateSlice)
    const { conversations, loading } = useAppSelector((state) => state.conversationState)

    useEffect(() => {
        dispatch(getConversationsList())
    }, [dispatch])


    const onEditMessage = (id: string) => {
        router.push(`/c/${id}`)
    }

    const onCreateConversation = async () => {
        const conversation = {
            id: uuidv4(),
            title: "abc",
            userId: 1,
            messageId: 1
        } as Conversation
        await postCreateConversation(conversation)
        dispatch(getConversationsList())
        router.push(`/c/${conversation.id}`)
    }

    return (
        <SidebarWrapper $isShow={isShow}>
            <div className="header-sidebar">
                <div className="header-sidebar--logo"><SiPreact size={30} /><span className="tooltiptext">New Chat</span></div>
                <Button type='button' $isSmall onClick={onCreateConversation}><FaRegEdit size={25} /> </Button>
            </div>
            <div className="list-typing-moment">
                <ul>
                    {
                        !loading ?
                            conversations?.map((item: Conversation) => {
                                return <li key={item.id}><Button type="button" $isFull $isSmall onClick={() => onEditMessage(item.id)}><IoChatboxOutline size={25} /><span className="tooltiptext">{item.title}</span></Button></li>
                            }) : <p>loading...</p>
                    }
                </ul>
            </div>
            <div className="footer-sidebar">
                <ul>
                    <li>
                        <div className="footer-sidebar-profile">
                            <div className="footer-sidebar-profile--avatar">
                                <Image src="/logo/thinhpham.webp" width={50} height={50} alt="" />
                            </div>
                            <div className="footer-sidebar-profile--info">
                                <p className="tooltiptext"><strong>Thinh Pham</strong></p>
                                <small className="tooltiptext">thinhpham67ag@gmail.com</small>
                            </div>
                        </div>

                    </li>
                    <li>  <Button type='button' $isSmall $isFull ><IoSave size={25} /><span className="tooltiptext">Saved</span></Button></li>
                    <li>  <Button type='button' $isSmall $isFull ><IoRocket size={25} /><span className="tooltiptext">Update to Pro</span></Button></li>
                    <li>  <Button type='button' $isSmall $isFull ><CiLogout size={25} /><span className="tooltiptext">Logout</span></Button></li>
                </ul>
            </div>
        </SidebarWrapper>
    )
}

export default Sidebar
