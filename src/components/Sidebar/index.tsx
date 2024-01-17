'use client'
import React, { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button, Loading, DropDownMenu } from '@/components'
import { SidebarWrapper } from './styles'
import { IoChatboxOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { VscEllipsis } from "react-icons/vsc";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { SiPreact } from "react-icons/si";
import { CiLogout } from "react-icons/ci";
import { useDispatch } from 'react-redux'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { getConversationsList, postAddConversation, getConversationByCode, deleteRemoveConversation } from '@/redux/store/slices/conversationSlice'
import { getMessageChatsList } from '@/redux/store/slices/messageSlice'
import { handleEnterInput } from '@/redux/store/slices/stateSlice'
import { Conversation } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
import { useClerk, useUser } from "@clerk/nextjs";
import moment from 'moment'


const Sidebar = () => {
    const { code } = useParams()
    const { signOut } = useClerk()
    const { user, isLoaded } = useUser()
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const { isShow } = useAppSelector((state) => state.stateSlice)
    const { conversations, loadingAction, loadingList } = useAppSelector((state) => state.conversationsState)

    useEffect(() => {
        dispatch(getConversationsList())
    }, [dispatch])


    const onEditMessage = (code: string) => {
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
        <SidebarWrapper $isShow={isShow} >
            <div className="header-sidebar">
                <div className="header-sidebar--logo" onClick={() => router.push("/chats")}><SiPreact size={30} /><span className="tooltiptext">New Chat</span></div>
                <div className="header-sidebar--control">
                    {!loadingList && !loadingAction ? <Button type='button' $isSmall onClick={onCreateConversation}><IoMdAdd size={25} /> </Button> : <Loading color="dark" isIcon />}
                </div>
            </div>
            <div className="list-typing-moment">
                <ul>
                    {
                        !loadingList && !loadingAction ?
                            conversations?.map((item: Conversation) => {
                                return <li key={item.id} className={`conversation-item ${item.code === code ? "focused" : ""}`}>
                                    <div className="conversation-item--title">
                                        <Button type="button" $isFull $isSmall onClick={() => onEditMessage(item.code)}>
                                            <IoChatboxOutline size={30} />
                                            {!isShow && <div className="text">
                                                <span className="tooltiptext">{item.title}</span>
                                                <small className="tooltiptext">{moment(item.createdAt?.toString()).format(process.env.NEXT_PUBLIC_DATE_TIME_FORMAT_MOMENT)}</small>
                                            </div>
                                            }
                                        </Button>
                                    </div>
                                    {!isShow && <div className="conversation-item--setting">
                                        <DropDownMenu title={<VscEllipsis />} list={[
                                            {
                                                icon: <FaRegEdit />,
                                                buttonText: "Rename",
                                                isDialog: false,
                                                func: () => {
                                                    router.push("/")
                                                }
                                            },
                                            {
                                                icon: <MdDeleteOutline />,
                                                buttonText: "Remove",
                                                isDialog: true,
                                                modalContent: "Do you want to delete this item?",
                                                modalTitle: "Delete Conversation",
                                                func: () => {
                                                    dispatch(deleteRemoveConversation({ id: item.id } as Conversation))
                                                    router.push("/chats")
                                                }
                                            }
                                        ]} />
                                    </div>
                                    }
                                </li>
                            }) : <Loading color="dark" isIcon={isShow} />
                    }
                </ul>
            </div>
            <div className="footer-sidebar">
                <ul>
                    <li>
                        <div className="footer-sidebar-profile">
                            <div className="footer-sidebar-profile--avatar">
                                {user && isLoaded && <img src={user?.imageUrl} alt={user?.firstName as string} />}
                            </div>
                            <div className="footer-sidebar-profile--info">
                                {user && isLoaded ? <>
                                    <p className="tooltiptext"><strong>{user?.fullName}</strong></p>
                                    <small className="tooltiptext">{user?.primaryEmailAddress?.emailAddress}</small>
                                </> : <Loading color="dark" />}
                            </div>
                        </div>
                    </li>
                    {/* <li>  <Button type='button' $isSmall $isFull ><IoSave size={25} /><span className="tooltiptext">Saved</span></Button></li> */}
                    {/* <li>  <Button type='button' $isSmall $isFull ><IoRocket size={25} /><span className="tooltiptext">Update to Pro</span></Button></li> */}
                    <li>  <Button type='button' $isSmall $isFull onClick={() => signOut(() => router.push("/"))}><CiLogout size={25} /><span className="tooltiptext">Logout</span></Button></li>
                </ul>
            </div>

        </SidebarWrapper>
    )
}

export default Sidebar
