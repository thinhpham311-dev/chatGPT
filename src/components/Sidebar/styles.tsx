import tw, { styled, css, theme } from 'twin.macro'

interface sidebarProps {
    $isShow?: boolean
}

const SidebarWrapper = styled.div<sidebarProps>(({ $isShow }) => [
    tw`h-full bg-black text-white flex flex-col justify-between shadow-lg shadow-indigo-500/40 `,
    !$isShow ? tw`w-[300px]` : tw`w-[50px]`,
    css`
        .header-sidebar, .conversation-item{
            ${tw` flex items-center flex-wrap xl:justify-between lg:justify-between md:justify-between justify-center  `}
            ${!$isShow ? tw`h-[50px]` : tw`h-[auto]`},
            &--logo, &--title{
                ${tw`flex gap-x-3 items-center  justify-center w-[calc(100%-45px)]`}
                .tooltiptext{
                    ${tw`font-bold`}
                }
            }
            &--logo{
                ${tw`p-2`}
                ${!$isShow ? tw`w-[auto]` : tw`w-full`}
            }
            &--control, &--setting{
                ${tw`relative h-[45px] w-[45px] flex items-center justify-center`}
            }
            &:not(.conversation-item){
                ${tw`border-b-[0.5px] border-white`}
            }
        }

        .list-typing-moment{
            ${tw`flex-1 overflow-y-auto overflow-x-hidden`}
            ul{
                ${tw`relative h-full w-full`}
                li{
                    ${tw`flex items-center justify-between`}
                }
            }
        }
        .footer-sidebar{
            ${tw`border-t-[0.5px] border-white `}
            .footer-sidebar-profile{
                ${tw`flex items-center bg-white py-3`}
                &--avatar{
                    ${tw`h-full`}
                    img{
                        ${tw`h-[35px] w-[auto] object-cover`}
                    }
                }
                &--info{
                    ${tw`flex flex-col text-black`}
                }
            }
        }
        button{
            ${!$isShow ? tw`justify-start` : tw`justify-center`}
        }
        .tooltiptext{
            ${$isShow && tw`hidden`}
        }
    `
])

export { SidebarWrapper }