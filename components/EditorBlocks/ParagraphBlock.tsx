import { BlockParagraph } from "@/utils/editor-output"
import { Center, Text } from "@chakra-ui/react"

type ParagraphBlockProps = Omit<BlockParagraph, 'type' | 'id'>

export const ParagraphBlock: React.FC<ParagraphBlockProps> = ({ data }) => {
    return (
        <Center maxW={1200}>
            <Text>{data.text}</Text>
        </Center>
    )
}