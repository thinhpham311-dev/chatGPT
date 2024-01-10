import tw, { styled, css, theme } from 'twin.macro'

const FooterWrapper = styled.div(() => [
    tw`w-full  h-[70px] flex flex-col justify-center`,
    css`
        .footer-inner{
            ${tw`flex items-center justify-center gap-x-2 xl:w-1/2 w-full mx-auto px-2`}
            &--btn{
                ${tw`h-[40px] w-[40px] flex items-center justify-center`}
            }
        }
    `
])

export { FooterWrapper }