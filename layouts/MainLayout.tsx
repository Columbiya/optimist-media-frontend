import { AppContainer } from "@/components/AppContainer/AppContainer";
import { Header } from "@/components/Header/Header"
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Container, Divider } from "@chakra-ui/react"
import { useRouter } from "next/router";
import { useMemo } from 'react'

interface MainLayoutProps {
    children: React.ReactNode
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const router = useRouter()
    const crumbsPath = useMemo(() => {
        return router.pathname.split('/')
    }, [router.pathname])

    return (
        <>
            <Header />

            <Container maxW="1600">
                {router.pathname.length > 1 && 
                    <Breadcrumb mt={25} mb={25} separator={<ChevronRightIcon color='gray.500' />}>
                        {crumbsPath.slice(1).map(route => (
                            <BreadcrumbItem key={route}>
                                <BreadcrumbLink href={`/${route}`} fontSize={15} fontStyle="italic">{route && route[0].toUpperCase() + route.slice(1)}</BreadcrumbLink>
                            </BreadcrumbItem>
                        ))}
                    </Breadcrumb>
                }

                <Divider mb={50} />

            </Container>

            {children}
        </>
    )
}