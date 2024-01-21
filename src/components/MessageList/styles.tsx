import tw, { styled, css, theme } from 'twin.macro'

const MessageListWrapper = styled.div(() => [
    tw`w-full grid  relative  bg-slate-200 z-0 h-[calc(100%-120px)] overflow-y-auto overflow-x-hidden`,
    css`
        .messageList-inner{
            ${tw` h-full rounded-lg xl:w-[80%] w-full mx-auto py-3`}
            &--content{
                ${tw`flex flex-col justify-end h-full gap-y-3 `}
                li{
                    ${tw`py-0 mx-2`}
                }
                &--loading{
                    ${tw`relative`}
                }
            }
            
        }
    `
])

export { MessageListWrapper }