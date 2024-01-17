import tw, { styled, css, theme } from 'twin.macro'

interface sidebarProps {
    $isShow?: boolean
}

const SidebarWrapper = styled.div<sidebarProps>(({ $isShow }) => [
    tw`h-full bg-black text-white flex flex-col justify-between shadow-lg shadow-indigo-500/40 z-0`,
    !$isShow ? tw`xl:w-[300px] w-[300px]` : tw`xl:w-[50px] w-0`,
    css`
        .header-sidebar, .conversation-item{
            ${tw` flex items-center flex-wrap justify-center  `}
            ${!$isShow ? tw`h-[60px]` : tw`h-[auto]`}
            &--logo, &--title{
                ${tw`flex gap-x-3 items-center  `}
                ${!$isShow ? tw`w-[calc(100%-50px)]` : tw`h-[auto]`}
                .tooltiptext{
                    ${tw`font-bold`}
                }
            }
            &--logo{
                ${tw`p-2 flex-1 cursor-pointer`}
                ${!$isShow ? tw`w-[auto]` : tw`w-full`}
            }
            &--control, &--setting{
                ${tw`relative h-[50px] w-[50px] flex items-center justify-center`}
                
            }
    
          
            &:not(.conversation-item){
                ${tw`border-b-[0.5px] border-white shadow-lg`}
            }
        }

        .list-typing-moment{
            ${tw`flex-1 overflow-y-auto overflow-x-hidden`}
            ul{
                ${tw`relative h-full w-full`}
                li{
                    ${tw`flex items-center justify-center`}
                    &.focused{
                        ${tw`bg-cyan-700`}
                    }
                }
            }
        }
        .footer-sidebar{
            ${tw`border-t-[0.5px] border-white `}
            &-profile{
                ${tw`flex items-center gap-x-2 bg-white p-2 h-[50px]`}
                &--avatar{
                    ${tw`h-full relative `}
                    img{
                        ${tw`h-[35px] w-[auto] object-cover rounded-full`}
                    }
                }
                &--info{
                    ${tw` flex-col text-black`}
                    ${!$isShow ? tw`flex` : tw`hidden`}
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