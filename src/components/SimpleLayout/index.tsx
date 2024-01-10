'use client'
import React, { useEffect } from 'react'
import { Sidebar, Context } from "@/components"
import { SimpleLayoutWrapper } from './styles'
import { useAppSelector } from "@/redux/store";
import { Conversation } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";


const SimpleLayout = ({ children }: { children: React.ReactNode }) => {


    return (
        <SimpleLayoutWrapper >
            <Sidebar />
            <Context>
                {children}
            </Context>
        </SimpleLayoutWrapper>
    )
}

export default SimpleLayout


