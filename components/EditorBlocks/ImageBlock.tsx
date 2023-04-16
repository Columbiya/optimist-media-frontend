import { BlockImage } from "@/utils/editor-output"
import { Center, Image, Text } from "@chakra-ui/react"

type ImageBlockProps = Omit<BlockImage, 'type' | 'id'>

export const ImageBlock: React.FC<ImageBlockProps> = ({ data }) => {
    const { caption, file, stretched, withBackground, withBorder } = data

    return (
        <Center maxW="400" pos="relative" flexDir="column">
            <Image src={file.url} alt="Image" />

            <Center maxW="250" mt={25}>
                <Text>{caption}</Text>
            </Center>
        </Center>
    )
}