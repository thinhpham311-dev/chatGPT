'use client'
import React from 'react'
import { Loading, DropDownMenu, Button, Input } from "@/components"
import { ConversationWrapper } from './styles'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { deleteRemoveConversation, putUpdateConversation } from '@/redux/store/slices/conversationSlice'
import { handleEnterSend } from '@/redux/store/slices/stateSlice'
import { useDispatch } from 'react-redux'
import { useParams } from 'next/navigation'
import { Conversation } from '@prisma/client'
import { useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { VscEllipsis } from "react-icons/vsc";
import { FaRegEdit } from "react-icons/fa";
import { IoChatboxOutline, IoSaveOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import moment from 'moment'

const ConversationList = () => {
    const router = useRouter()
    const { user } = useClerk()
    const { code } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const { isShow } = useAppSelector((state) => state.stateSlice)
    const { conversations, loadingAction, loadingList } = useAppSelector((state) => state.conversationsState)

    const onEditMessage = (code: string) => {
        dispatch(handleEnterSend(""))
        router.push(`/c/${code}`)
    }



    return (
        <ConversationWrapper>
            <ul>
                {
                    !loadingList && !loadingAction ?
                        conversations?.map((item: Conversation) => {
                            return <li key={item.id} className={`conversation-item ${item.code === code ? "focused" : ""}`}>
                                <div className="conversation-item--title">
                                    <Button type="button" $isFull $isSmall onClick={() => onEditMessage(item.code as string)}>
                                        <IoChatboxOutline size={30} />
                                        {!isShow && <div className="text">
                                            <span className="tooltiptext" >{item.title}</span>
                                            <small className="tooltiptext">{moment(item.createdAt?.toString()).format(process.env.NEXT_PUBLIC_DATE_TIME_FORMAT_MOMENT)}</small>
                                        </div>
                                        }
                                    </Button>
                                </div>
                                {!isShow && <div className="conversation-item--setting">


                                    <DropDownMenu title={<VscEllipsis />} list={[

                                        {
                                            icon: <MdDeleteOutline />,
                                            buttonText: "Remove",
                                            isDialog: true,
                                            modalContent: "Do you want to delete this item?",
                                            modalTitle: "Delete Conversation",
                                            func: () => {
                                                dispatch(deleteRemoveConversation({ code: item.code } as Conversation))
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
        </ConversationWrapper>
    )
}

export default ConversationList
