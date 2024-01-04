'use client'
import React from 'react'
import { FooterWrapper } from './styles'
import { Input, Button } from '@/components'
import { IoIosSend } from "react-icons/io";
import tw from 'twin.macro'

const Footer = () => (
    <FooterWrapper>
        <div className="footer-inner">
            <Input type="text" placeholder='Message ChatGPT Demo...' $outline="dark" $isFull />
            <Button type="button" $variant='system' $isSmall data-c-tooltip="I’m the c-tooltip text"><IoIosSend size={25} /><span className="tooltiptext">Send</span></Button>
        </div>
    </FooterWrapper>
)

export default Footer
