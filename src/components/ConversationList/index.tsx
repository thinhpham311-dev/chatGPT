'use client'
import React from 'react'
import { Loading, DropDownMenu, Button, Input } from "@/components"
import { ConversationWrapper } from './styles'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { deleteRemoveConversation, putUpdateConversation } from '@/redux/store/slices/conversationSlice'
import { handleEnterSend, handleEnterEdit, openInput, closeInput } from '@/redux/store/slices/stateSlice'
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
    const { isShow, isShowInput, inputEdit, id } = useAppSelector((state) => state.stateSlice)
    const { conversations, loadingAction, loadingList, loadingActionEdit, conversationId } = useAppSelector((state) => state.conversationsState)

    const onEditMessage = (code: string) => {
        dispatch(handleEnterSend(""))
        router.push(`/c/${code}`)
    }
    const onSaveConversation = (id: number) => {
        dispatch(putUpdateConversation({ id, title: inputEdit } as Conversation))
        dispatch(closeInput(id));
    }

    const handleOpenInput = (id: number) => {
        dispatch(openInput(id as number))
    }

    const handleEnterInputField = (updatedTitle: string) => {
        dispatch(handleEnterEdit(updatedTitle))
    }

    return (
        <ConversationWrapper>
            <ul>
                {
                    !loadingList && !loadingAction ?
                        conversations?.map((item: Conversation) => {
                            let isShowInputEnter = isShowInput && item.id == id
                            return <li key={item.id} className={`conversation-item ${item.code === code ? "focused" : ""}`}>
                                <div className="conversation-item--title">
                                    {isShowInputEnter ? <Input type="text" onChange={(e) => handleEnterInputField(e.target.value)} $variant='light' defaultValue={item.title} /> :
                                        <Button type="button" $isFull $isSmall onDoubleClick={() => handleOpenInput(item.id)} onClick={() => onEditMessage(item.code as string)}>
                                            {!isShowInputEnter && <IoChatboxOutline size={30} />}
                                            {!isShow && <div className="text">
                                                <span className="tooltiptext">{item.title}</span>
                                                <small className="tooltiptext">{moment(item.createdAt?.toString()).format(process.env.NEXT_PUBLIC_DATE_TIME_FORMAT_MOMENT)}</small>
                                            </div>
                                            }
                                        </Button>
                                    }
                                </div>
                                {!isShow && <div className="conversation-item--setting">
                                    {loadingActionEdit && item.id === id && <Loading color="dark" isIcon />}

                                    {!isShowInputEnter ?
                                        <DropDownMenu title={<VscEllipsis />} list={[
                                            {
                                                icon: <FaRegEdit />,
                                                buttonText: "Rename",
                                                isDialog: false,
                                                func: () => {
                                                    handleOpenInput(item.id)
                                                }
                                            },
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
                                        ]} /> : <Button type="button" $isSmall onClick={() => onSaveConversation(item.id)} ><IoSaveOutline size={25} /></Button>}
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
