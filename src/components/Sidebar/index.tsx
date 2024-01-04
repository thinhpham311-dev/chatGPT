'use client'
import React from 'react'
import Image from 'next/image'
import { SidebarWrapper } from './styles'
import { Button } from "@/components"
import { IoHome, IoSave, IoRocket, IoChatboxOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { SiPreact } from "react-icons/si";
import { CiLogout } from "react-icons/ci";
import { useSelector } from 'react-redux';
import { modalState$ } from '@/redux/selectors';

import tw, { styled, css, theme } from 'twin.macro'

const Sidebar = () => {
    const { isShow } = useSelector(modalState$);
    return (
        <SidebarWrapper $isShow={isShow}>
            <div className="header-sidebar">
                <div className="header-sidebar--logo"><SiPreact size={30} /><span className="tooltiptext">New Chat</span></div>
                <Button type='button' $isSmall><FaRegEdit size={25} /></Button>
            </div>
            <div className="list-typing-moment">
                <ul>
                    <li><Button type='button' $isSmall $isFull ><IoChatboxOutline size={25} /><span className="tooltiptext">What is Programing ?</span></Button></li>
                </ul>
            </div>
            <div className="footer-sidebar">
                <ul>
                    <li>
                        <div className="footer-sidebar-profile">
                            <div className="footer-sidebar-profile--avatar">
                                <Image src="/logo/thinhpham.webp" width={50} height={50} alt="" />
                            </div>
                            <div className="footer-sidebar-profile--info">
                                <p className="tooltiptext"><strong>Thinh Pham</strong></p>
                                <small className="tooltiptext">thinhpham67ag@gmail.com</small>
                            </div>
                        </div>

                    </li>
                    <li>  <Button type='button' $isSmall $isFull ><IoSave size={25} /><span className="tooltiptext">Saved</span></Button></li>
                    <li>  <Button type='button' $isSmall $isFull ><IoRocket size={25} /><span className="tooltiptext">Update to Pro</span></Button></li>
                    <li>  <Button type='button' $isSmall $isFull ><CiLogout size={25} /><span className="tooltiptext">Logout</span></Button></li>
                </ul>
            </div>
        </SidebarWrapper>
    )
}

export default Sidebar
