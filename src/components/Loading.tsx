import tw, { styled, css, theme } from 'twin.macro'

interface InputProps {
    $variant?: 'dark' | 'light'
    $isFill?: boolean
}

const LoadingWrapper = styled.div<InputProps>(({ $isFill, $variant }) => [
    tw`w-full h-full absolute left-0 top-0 flex items-center justify-center gap-x-3`,
    $isFill && tw`fixed top-0 left-0`,
    $variant === "dark" && tw`bg-black text-white`,
    $variant === "light" && tw`bg-white text-black`,
    css`
    span{
        ${tw`text-lg  font-bold`}
    }
    svg{
        ${tw`animate-spin`}
        path{
            ${$variant === "dark" && tw`stroke-white`}
            ${$variant === "light" && tw`stroke-black`}
        }
    }
    `
])
const IconLoading = () => {
    return (
        <svg width="32" height="32" viewBox="0 0 48 48"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M24 4v4m10-1.32l-2 3.464M41.32 14l-3.464 2M44 24h-4m1.32 10l-3.464-2M34 41.32l-2-3.464M24 44v-4m-10 1.32l2-3.464M6.68 34l3.464-2M4 24h4M6.68 14l3.464 2M14 6.68l2 3.464"></path></svg>
    )
}

const Loading = ({ ...config }: any) => (
    <LoadingWrapper $isFill={config.isfill} $variant={config.color}>
        <IconLoading />{!config.isIcon && <span>Loading...</span>}
    </LoadingWrapper>
)


export default Loading 