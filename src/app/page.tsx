'use client'
import React from 'react'
import { SimpleLayout, Carousel, Button } from "@/components"
import tw, { css, styled } from 'twin.macro'
import { useRouter } from 'next/navigation'
import { useUser, UserButton } from '@clerk/nextjs'

const Home = () => {
    const { user, isLoaded } = useUser()
    const router = useRouter()


    return (
        <SimpleLayout>
            <FlexBoxs>
                <div className="flex-box--banner">
                    <Carousel />
                </div>
                <div className="flex-box--content">
                    <h1>Hello Everybody!</h1>
                    {user && isLoaded && <div className="flex-box--content-avatar"><UserButton afterSignOutUrl='/chats' /></div>}
                    {
                        !user && isLoaded ?
                            <>
                                <Button type="button" onClick={() => router.push("/sign-in")} $isFull $outline='light'><span className="text">Sign In</span></Button>
                                <Button type="button" onClick={() => router.push("/sign-up")} $isFull $outline='light'><span className="text">Sign Up</span></Button>
                            </>
                            : <Button type="button" onClick={() => router.push("/chats")} $outline='light'><span className="text">Manage Tasks</span></Button>
                    }
                </div>
            </FlexBoxs>
        </SimpleLayout>
    )
}

export default Home


const FlexBoxs = styled.div(() => [
    tw`flex w-full h-dvh text-white`,
    css`
    .flex-box--banner{
        ${tw`w-3/4`}
    }
    .flex-box--content{
        ${tw`w-1/4 flex flex-col justify-center items-center gap-y-4 px-10 bg-black shadow-lg shadow-indigo-500/40`}
        h1{
            ${tw`text-2xl font-bold`}
        }
        &-avatar{
            ${tw`absolute top-1 right-1 p-5`}
        }
    }
    `
])
