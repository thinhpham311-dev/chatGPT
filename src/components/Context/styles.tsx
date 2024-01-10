import tw, { styled, css, theme } from 'twin.macro'

interface contextProps {
    $isShow?: boolean
}

const ContextWrapper = styled.div<contextProps>(({ $isShow }) => [
    tw`h-full flex flex-col justify-between transition-all duration-500 xl:relative absolute`,
    !$isShow ? tw`xl:w-[calc(100%-300px)] lg:w-[calc(100%-300px)] w-full` : tw`xl:w-[calc(100%-50px)] lg:w-[calc(100%-50px)] w-full`,
    css`.tooltiptext{
        ${!$isShow && tw`hidden`}
    }`

])

export { ContextWrapper }