import tw, { styled, css, theme } from 'twin.macro'

const FooterWrapper = styled.div(() => [
    tw`w-full h-[100px] flex flex-col justify-center`,
    css`
        .footer-inner{
            ${tw`flex items-center justify-center gap-x-2 xl:w-2/3 w-full mx-auto px-2`}
        }
    `
])

export { FooterWrapper }