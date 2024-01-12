'use client'
import React from 'react'
import Image from 'next/image'
import { Loading } from "@/components"
import { SiPreact } from "react-icons/si";
import { CardWrapper } from './styles'
import { Message } from '@prisma/client';
import { useUser, } from '@clerk/nextjs'

interface cardProps {
    isBot?: Boolean,
    message: Message,
}

const Card = ({ isBot, message }: cardProps) => {
    const { user } = useUser()
    const { content, createdAt } = message

    return (
        <CardWrapper>
            <div className="card-inner">
                {isBot ?
                    <div className="card-inner--image-bot">
                        <SiPreact size={40} />
                    </div> :
                    <img className="card-inner--image" src={user?.imageUrl} alt={user?.firstName as string} />
                }

                <div className="card-inner--content">
                    <p className="card-inner--content--title">{isBot ? "bot" : user?.fullName}</p>
                    <small className="card-inner--content--timeline">{createdAt.toString()}</small>
                    <p className="card-inner--content--message">{content}</p>
                </div>
            </div>
        </CardWrapper>
    )
}

export default Card
