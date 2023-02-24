import { useEffect } from 'react'
import NextLink from 'next/link'
import { ROUTES } from '../../utils/ROUTES'
import { AppContainer } from '../AppContainer/AppContainer'
import { Box, Button, Flex, Heading, HStack, Menu, MenuButton, MenuDivider, MenuItem, MenuList, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useAuthStore } from '@/store/authStore'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { ViewIcon } from '@chakra-ui/icons'
import { FiLogOut } from 'react-icons/fi'
import { useSubjectsStore } from '@/store/useSubjectsStore'

export const Header: React.FC = () => {
    const router = useRouter()
    const { isAuthenticated, user, unauthorize } = useAuthStore()
    const { getSubjects, subjects } = useSubjectsStore()
    const toast = useToast()

    useEffect(() => {
        async function getData() {
            try {
                await getSubjects()
            } catch(e) {
                console.log(e)
                toast({
                    title: "Что то пошло не так",
                    status: 'error',
                    duration: 5000,
                    isClosable: true
                })
            }
        }

        getData()
    }, [toast, getSubjects])

    return (
        <Box pos='static' top={0} left={0} p={15} background="whiteAlpha.50">
            <AppContainer>
                <Flex justifyContent='space-between' alignItems='center'>
                    <Heading onClick={() => router.push('/')} cursor="pointer" size="md" color="blue.400">Optimist Media</Heading>
                    
                    <Flex as="nav" alignItems='center'>
                        {user?.isAdmin && 
                            <NextLink href={ROUTES.ADMIN_PANEL} style={{marginRight: 15}}>
                                Админ панель
                            </NextLink>
                        }

                        <NextLink href={ROUTES.ARTICLES} style={{marginRight: 15}}>
                            Все статьи
                        </NextLink>

                        {!isAuthenticated ?
                        <>
                            <NextLink href={ROUTES.REGISTER} style={{marginRight: 15}}>
                                Register
                            </NextLink>
                            <NextLink href={ROUTES.LOGIN}>
                                Login
                            </NextLink>
                        </>: 
                        <Flex>
                            <HStack mr={25}>
                                {subjects.map(s => (
                                    <NextLink key={s.id} href={`${ROUTES.ARTICLES}?subjectId=${s.id}`}>
                                        {s.subject}
                                    </NextLink>
                                ))}
                            </HStack>
                            <Menu>
                                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                    {user && user.email.length > 20 ? user.email.slice(0, 20) + '...': user?.email}
                                </MenuButton>
                                <MenuList>
                                    <MenuItem icon={<ViewIcon />} as={NextLink} href={ROUTES.PROFILE}>
                                        Профиль
                                    </MenuItem>

                                    <MenuDivider />
                                    
                                    <MenuItem onClick={unauthorize} icon={<FiLogOut />}>
                                        Выйти
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </Flex>

                        }

                    </Flex>
                </Flex>
            </AppContainer>
        </Box>

    )
}