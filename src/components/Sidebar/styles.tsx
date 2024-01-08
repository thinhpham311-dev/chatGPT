import tw, { styled, css, theme } from 'twin.macro'

interface sidebarProps {
    $isShow?: boolean
}

const SidebarWrapper = styled.div<sidebarProps>(({ $isShow }) => [
    tw`h-full bg-black text-white flex flex-col justify-between shadow-lg shadow-indigo-500/40 `,
    !$isShow ? tw`w-[300px]` : tw`w-[50px]`,
    css`
        .header-sidebar{
            ${tw` flex items-center flex-wrap xl:justify-between lg:justify-between md:justify-between justify-center border-b-[0.5px] border-white `}
            ${!$isShow ? tw`h-[50px]` : tw`h-[auto]`},
            &--logo{
                ${tw`flex gap-x-3 items-center p-2 justify-center`}
            }
            &--control{
                ${tw`relative h-[45px] w-[50px]`}
            }
            button, &--logo{
            ${!$isShow ? tw`w-[auto]` : tw`w-full`},
            }
        }
        .list-typing-moment{
            ${tw`flex-1 overflow-y-auto overflow-x-hidden`}
            ul{
                ${tw`relative h-full w-full`}
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
            ${!$isShow ? tw`justify-start` : tw`justify-center`},
        }
        .tooltiptext{
            ${$isShow && tw`hidden`}
        }
    `
])

export { SidebarWrapper }