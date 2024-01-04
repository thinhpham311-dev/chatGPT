import tw, { styled, css, theme } from 'twin.macro'

const HeaderWrapper = styled.div(() => [
    tw`w-full h-[50px] border-b-[0.5px] border-black flex items-center justify-between`,
])

export { HeaderWrapper }