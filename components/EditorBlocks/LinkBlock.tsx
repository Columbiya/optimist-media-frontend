import { BlockLink } from "@/utils/editor-output"
import { Box, Flex, Image, Link, Text } from "@chakra-ui/react"

type linkBlockProps = Omit<BlockLink, 'type' | 'id'>

export const LinkBlock: React.FC<linkBlockProps> = ({ data }) => {
    return (
        <Link 
            border="1px solid #ccc" 
            borderRadius={15}
            p={15}
            pos="relative"
            width="50%"
            _hover={{background: "#818791"}}
        >
            {data.link}

            <Image 
                src={data.meta.image.url} 
                alt={data.meta.site_name} 
                display="block" width="32px" height="32px"
                pos="absolute"
                top="15"
                right="15"
            />

            <Text>{data.meta.site_name}</Text>
            <Text>{data.meta.description}</Text>
        </Link>
    )
}