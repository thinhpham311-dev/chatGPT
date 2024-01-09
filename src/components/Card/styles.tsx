import tw, { styled, css, theme } from 'twin.macro'

const CardWrapper = styled.div(() => [
    tw`rounded-lg shadow-lg`,
    css`
        .card-inner{
            ${tw`p-2 flex gap-x-1`}
            &--image{
                ${tw`rounded-full w-[50px] h-[50px] mt-3`}
            }
            &--image-bot{
                ${tw`flex items-center justify-center rounded-full border-[0.5px] border-black bg-black text-white h-[50px] w-[50px] mt-3`}
            }
            &--content{
                ${tw`p-2 w-[calc(100%-50px)]`}
                &--title{
                    ${tw`font-bold`}
                }
                &--timeline{
                    ${tw`font-thin`}
                }
                &--message{
                    ${tw`text-sm my-3`}
                }
            }
        }
    `
])

export { CardWrapper }