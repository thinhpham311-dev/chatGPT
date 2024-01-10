'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button, Loading } from '@/components'
import { SidebarWrapper } from './styles'
import { IoSave, IoRocket, IoChatboxOutline } from "react-icons/io5";
import { VscEllipsis } from "react-icons/vsc";
import { FaRegEdit } from "react-icons/fa";
import { SiPreact } from "react-icons/si";
import { CiLogout } from "react-icons/ci";
import { useDispatch } from 'react-redux'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { getConversationsList, postAddConversation, getConversationIdByCode } from '@/redux/store/slices/conversationSlice'
import { Conversation } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'


const Sidebar = () => {

    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const { isShow } = useAppSelector((state) => state.stateSlice)
    const { conversations, actionLoading, loading } = useAppSelector((state) => state.conversationsState)

    useEffect(() => {
        dispatch(getConversationsList())
    }, [dispatch])


    const onEditMessage = (code: string, id: number) => {
        dispatch(getConversationIdByCode({ id }))
        router.push(`/c/${code}${id}`)
    }

    const onCreateConversation = () => {
        const conversation = {
            code: uuidv4(),
            title: "New Messages",
            userId: 1,
        } as Conversation
        dispatch(postAddConversation(conversation))
        router.push(`/c/${conversation.code}`)
    }

    return (
        <SidebarWrapper $isShow={isShow}>
            <div className="header-sidebar">
                <div className="header-sidebar--logo"><SiPreact size={30} /><span className="tooltiptext">New Chat</span></div>
                <div className="header-sidebar--control">
                    {!actionLoading ? <Button type='button' $isSmall onClick={onCreateConversation}><FaRegEdit size={25} /> </Button> : <Loading color="dark" isIcon />}
                </div>
            </div>
            <div className="list-typing-moment">
                <ul>
                    {
                        !actionLoading && !loading ?
                            conversations?.map((item: Conversation) => {
                                return <li key={item.id} className="conversation-item">
                                    <div className="conversation-item--title">
                                        <Button type="button" $isFull $isSmall onClick={() => onEditMessage(item.code, item.id)}>
                                            <IoChatboxOutline size={30} />
                                            {!isShow && <div className="text">
                                                <span className="tooltiptext">{item.title}</span>
                                                <small className="tooltiptext">{item.createdAt?.toString()}</small>
                                            </div>
                                            }
                                        </Button>
                                    </div>
                                    {!isShow && <div className="conversation-item--setting">
                                        <Button type="button" $isSmall><VscEllipsis /></Button>
                                    </div>
                                    }
                                </li>
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
