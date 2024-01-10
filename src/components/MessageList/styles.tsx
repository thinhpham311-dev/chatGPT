import tw, { styled, css, theme } from 'twin.macro'

const MessageListWrapper = styled.div(() => [
    tw`w-full flex-1 items-center justify-between relative overflow-y-auto overflow-x-hidden bg-slate-200`,
    css`
        .messageList-inner{
            ${tw` h-full rounded-lg xl:w-[80%] w-full mx-auto `}
            &--content{
                ${tw`grid gap-y-3 py-2`}
            }
        }
    `
])

export { MessageListWrapper }