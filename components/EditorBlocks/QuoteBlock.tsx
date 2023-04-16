import { BlockQuote } from "@/utils/editor-output"
import { Box, Stack, Text } from "@chakra-ui/react"

type QuoteBlockProps = Omit<BlockQuote, 'type' | 'id'>

export const QuoteBlock: React.FC<QuoteBlockProps> = ({ data }) => {
    return (
        <>
            <Stack 
                borderRadius={15}
                textAlign={data.alignment}
                pos="relative"
                w="50%"
                mt={50}
            >
                <Box
                    _before={{content: '"*"', fontSize: "120px", lineHeight: "50px", position: 'absolute', top: 0, left: "-50px", zIndex: 15}}
                    _after={{content: '"*"', fontSize: "120px", lineHeight: "50px", position: 'absolute', bottom: 0, right: "-50px", zIndex: 15}}
                    p={15}
                    fontStyle="italic">
                    {data.text} as dasd asd asdk jasjdi nasd ksahd asjkdh asjhd kjash dkjaskjd ashjd ahsjd haskjd hka jashdkj ashjd asjhd askjhd asjdk shdasdj lkashk djl
                </Box>

            </Stack>

            <Text mt={50}>{data.caption}</Text>
        </>
        
    )
}