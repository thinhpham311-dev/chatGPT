import tw, { styled, css, theme } from 'twin.macro'

interface contextProps {
    $isShow?: boolean
}

const ContextWrapper = styled.div<contextProps>(({ $isShow }) => [
    tw`h-full flex flex-col justify-between`,
    !$isShow ? tw`w-[calc(100%-300px)]` : tw`w-[calc(100%-50px)]`,
    css`.tooltiptext{
        ${!$isShow && tw`hidden`}
    }`

])

export { ContextWrapper }