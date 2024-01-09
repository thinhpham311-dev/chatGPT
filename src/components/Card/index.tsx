'use client'
import React from 'react'
import Image from 'next/image'
import { Loading } from "@/components"
import { SiPreact } from "react-icons/si";
import { CardWrapper } from './styles'
import { useAppSelector } from '@/redux/store'

interface cardProps {
    isBot?: Boolean
}

const Card = ({ isBot }: cardProps) => {

    const { loading } = useAppSelector((state) => state.conversationsState)

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
                    <small className="card-inner--content--timeline">Aug 18</small>
                    <p className="card-inner--content--message">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                </div>
            </div>
        </CardWrapper>
    )
}

export default Card
