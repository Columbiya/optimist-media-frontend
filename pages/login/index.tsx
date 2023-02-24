import { MainLayout } from "@/layouts/MainLayout";
import { useAuthStore } from "@/store/authStore";
import { ROUTES } from "@/utils/ROUTES";
import { emailValid } from "@/utils/validators";
import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { NextPageWithLayout } from "../_app";

interface LoginValues {
    email: string
    password: string
}

const LoginPage: NextPageWithLayout = () => {
    const { register, formState: { errors }, handleSubmit } = useForm<LoginValues>()
    const toast = useToast()
    const { login, isAuthenticated } = useAuthStore()
    const router = useRouter()
    const onSubmit = useCallback(async (vals: LoginValues) => {
        try {
            await login(vals)

            toast({
                title: "Авторизация успешна",
                status: 'success',
                duration: 5000,
                isClosable: true
            })
        } catch(e) {
            toast({
                title: "Ошибка авторизации",
                description: 'Неправильный логин или пароль',
                status: 'error',
                duration: 5000,
                isClosable: true
            })
        }
    }, [login, toast])

    useEffect(() => {
        if (isAuthenticated) {
            router.push(ROUTES.ARTICLES)
        }
    }, [isAuthenticated, router])

    return (
        <>
        <Box maxW={500} pos="fixed" top="50%" left="50%" transform="translate(-50%, -50%)">
            <Heading mb={15}>Авторизуйся, чтобы начать создавать</Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isRequired isInvalid={!!errors.email} mb={15}>
                    <FormLabel>Email</FormLabel>
                    <Input {...register('email', {validate: {"Введите валидный email": emailValid}})} placeholder="Ваш email"/>
                    <FormErrorMessage>{errors.email?.type}</FormErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={!!errors.password} mb={15}>
                    <FormLabel>Пароль</FormLabel>
                    <Input {...register('password')} placeholder="Ваш пароль" />
                    <FormErrorMessage>{errors.password?.type}</FormErrorMessage>
                </FormControl>
                
                <Button mt={15} w="100%" alignSelf="center" colorScheme="blue" type="submit">Авторизироваться</Button>
            </form>
        </Box>
    </>
    )
}

LoginPage.getLayout = function getLayout(page) {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    )
}

export default LoginPage