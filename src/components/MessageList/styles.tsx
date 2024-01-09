import tw, { styled, css, theme } from 'twin.macro'

const MessageListWrapper = styled.div(() => [
    tw`w-full flex-1 items-center justify-between p-2 relative`,
    css`
        .messageList-inner{
            ${tw` h-full rounded-lg w-[80%] mx-auto`}
            &--content li{
                ${tw`mb-3`}
            }
        }
    `
])

export { MessageListWrapper }