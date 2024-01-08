'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button, Loading } from '@/components'
import { SidebarWrapper } from './styles'
import { IoSave, IoRocket, IoChatboxOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { SiPreact } from "react-icons/si";
import { CiLogout } from "react-icons/ci";
import { useDispatch } from 'react-redux'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { getConversationsList } from '@/redux/store/slices/conversationSlice'
import { Conversation } from '@prisma/client'
import { apiPostCreateConversation } from '@/services/ConversationService'
import { v4 as uuidv4 } from 'uuid'

const Sidebar = () => {

    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const { isShow } = useAppSelector((state) => state.stateSlice)
    const { conversations, loading } = useAppSelector((state) => state.conversationsState)

    useEffect(() => {
        dispatch(getConversationsList())
    }, [dispatch])


    const onEditMessage = (id: string) => {
        router.push(`/c/${id}`)
    }

    const onCreateConversation = async () => {
        const conversation = {
            code: uuidv4(),
            title: "New Messages",
            userId: 1,
        } as Conversation
        await apiPostCreateConversation(conversation)
        dispatch(getConversationsList())
        !loading && router.push(`/c/${conversation.code}`)
    }

    return (
        <SidebarWrapper $isShow={isShow}>
            <div className="header-sidebar">
                <div className="header-sidebar--logo"><SiPreact size={30} /><span className="tooltiptext">New Chat</span></div>
                <div className="header-sidebar--control">
                    {!loading ? <Button type='button' $isSmall onClick={onCreateConversation}><FaRegEdit size={25} /> </Button> : <Loading color="dark" isIcon />}
                </div>
            </div>
            <div className="list-typing-moment">
                <ul>
                    {
                        !loading ?
                            conversations?.map((item: Conversation) => {
                                return <li key={item.id}><Button type="button" $isFull $isSmall onClick={() => onEditMessage(item.code)}><IoChatboxOutline size={25} /><span className="tooltiptext">{item.title}</span></Button></li>
                            }) : <Loading color="dark" />
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
