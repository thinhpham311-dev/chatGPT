'use client'
import React from 'react'
import Image from 'next/image'
import { Loading } from "@/components"
import { SiPreact } from "react-icons/si";
import { CardWrapper } from './styles'
import { useAppSelector } from '@/redux/store'
import { Message } from '@prisma/client';

interface cardProps {
    isBot?: Boolean,
    message: Message
}

const Card = ({ isBot, message }: cardProps) => {

    const { content, createdAt } = message

    return (
        <CardWrapper>
            <div className="card-inner">
                {isBot ?
                    <div className="card-inner--image-bot">
                        <SiPreact size={40} />
                    </div> :
                    <Image className="card-inner--image" width={100} height={100} src="/avatars/jonathan.jpg" alt="Avatar of Jonathan Reinink" />
                }

                <div className="card-inner--content">
                    <p className="card-inner--content--title">{isBot ? "bot" : "Jonathan Reinink"}</p>
                    <small className="card-inner--content--timeline">{createdAt.toString()}</small>
                    <p className="card-inner--content--message">{content}</p>
                </div>
            </div>
        </CardWrapper>
    )
}

export default Card
