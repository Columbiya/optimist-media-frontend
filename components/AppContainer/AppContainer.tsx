import { Container } from "@chakra-ui/react"

interface AppContainerProps {
    children: React.ReactNode
}

export const AppContainer: React.FC<AppContainerProps>= ({ children }) => {
    return (
        <Container maxW="1400px">
            {children}
        </Container>
    )
}