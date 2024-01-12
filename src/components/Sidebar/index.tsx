'use client'
import React, { useEffect } from 'react'
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
import { getConversationsList, postAddConversation, getConversationByCode } from '@/redux/store/slices/conversationSlice'
import { handleEnterInput } from '@/redux/store/slices/stateSlice'
import { Conversation } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
import { useClerk, useUser } from "@clerk/nextjs";

const Sidebar = () => {
    const { signOut } = useClerk()
    const { user } = useUser()
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const { isShow } = useAppSelector((state) => state.stateSlice)
    const { conversations, loadingAction, loadingList } = useAppSelector((state) => state.conversationsState)
    console.log(user?.id)

    useEffect(() => {
        dispatch(getConversationsList())
    }, [dispatch])


    const onEditMessage = (code: string) => {
        dispatch(getConversationByCode({ code } as Conversation))
        dispatch(handleEnterInput(""))
        router.push(`/c/${code}`)
    }

    const onCreateConversation = () => {
        const conversation = {
            userId: user?.id,
            code: uuidv4(),
            title: "New Messages",
        } as Conversation
        dispatch(postAddConversation(conversation))
        router.push(`/c/${conversation.code}`)

    }

    return (
        <SidebarWrapper $isShow={isShow}>
            <div className="header-sidebar">
                <div className="header-sidebar--logo"><SiPreact size={30} /><span className="tooltiptext">New Chat</span></div>
                <div className="header-sidebar--control">
                    {!loadingAction ? <Button type='button' $isSmall onClick={onCreateConversation}><FaRegEdit size={25} /> </Button> : <Loading color="dark" isIcon />}
                </div>
            </div>
            <div className="list-typing-moment">
                <ul>
                    {
                        !loadingAction && !loadingList ?
                            conversations?.map((item: Conversation) => {
                                return <li key={item.id} className="conversation-item">
                                    <div className="conversation-item--title">
                                        <Button type="button" $isFull $isSmall onClick={() => onEditMessage(item.code)}>
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
                                <img src={user?.imageUrl} alt={user?.firstName as string} />
                            </div>
                            <div className="footer-sidebar-profile--info">
                                <p className="tooltiptext"><strong>{user?.fullName}</strong></p>
                                <small className="tooltiptext">{user?.primaryEmailAddress?.emailAddress}</small>
                            </div>
                        </div>
                    </li>
                    <li>  <Button type='button' $isSmall $isFull ><IoSave size={25} /><span className="tooltiptext">Saved</span></Button></li>
                    <li>  <Button type='button' $isSmall $isFull ><IoRocket size={25} /><span className="tooltiptext">Update to Pro</span></Button></li>
                    <li>  <Button type='button' $isSmall $isFull onClick={() => signOut(() => router.push("/"))}><CiLogout size={25} /><span className="tooltiptext">Logout</span></Button></li>
                </ul>
            </div>

        </SidebarWrapper>
    )
}

export default Sidebar
