import tw, { styled, css, theme } from 'twin.macro'

const MessageListWrapper = styled.div(() => [
    tw`w-full flex-1 items-center justify-between relative overflow-y-auto overflow-x-hidden bg-slate-200 z-0`,
    css`
        .messageList-inner{
            ${tw` h-[auto] rounded-lg xl:w-[80%] w-full mx-auto m-3`}
            &--content, &--content>li{
                ${tw`grid gap-y-3 py-0 mx-2`}
            }
        }
    `
])

export { MessageListWrapper }