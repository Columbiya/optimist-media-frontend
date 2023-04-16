import { Box, Center, Text } from "@chakra-ui/react"

export const DelimiterBlock: React.FC = () => {
    return (
        <Box fontSize={58}>
            <Center>
                <Text>*</Text>
                <Text>*</Text>
                <Text>*</Text>
            </Center>
        </Box>
    )
}