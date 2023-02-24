import { MainLayout } from "@/layouts/MainLayout";
import { useAuthStore } from "@/store/authStore";
import { ROUTES } from "@/utils/ROUTES";
import { emailValid, minLengthValidatorCreator } from "@/utils/validators";
import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactElement, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NextPageWithLayout } from "../_app";

interface RegisterValues {
    email: string
    password: string
    repeatPassword: string
}

const minLength8 = minLengthValidatorCreator(8)

const RegisterPage: NextPageWithLayout = () => {
    const { register, formState: { errors }, handleSubmit, setError } = useForm<RegisterValues>()
    const { isAuthenticated, getAuthenticated, registerUser, unauthorize } = useAuthStore()
    const toast = useToast()
    const router = useRouter()
    const onSubmit = useCallback(async (vals: RegisterValues) => {
        if (vals.repeatPassword !== vals.password) {
            setError('repeatPassword', {message: "Пароли не совпадают"})
        }

        try {
            await registerUser(vals)

            toast({
                title: 'Регистрация успешна',
                status: 'success',
                duration: 5000,
                isClosable: true
            })
        } catch(e) {
            if (e instanceof Error) {
                toast({
                    title: "Ошибка регистрации",
                    description: "Такой Email уже зарегистрирован",
                    status: 'error',
                    duration: 5000,
                    isClosable: true
                })
            }
        }

        console.log(vals)
    }, [registerUser, setError, toast])

    useEffect(() => {
        if (isAuthenticated) {
            router.push(ROUTES.ARTICLES)
        }
    }, [isAuthenticated, router])

    return (
        <>
            <Box maxW={500} pos="fixed" top="50%" left="50%" transform="translate(-50%, -50%)">
                    <Heading mb={15}>Создай аккаунт чтобы быть в тренде</Heading>
                    
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl isRequired isInvalid={!!errors.email} mb={15}>
                            <FormLabel>Email</FormLabel>
                            <Input {...register('email', {validate: {"Введите валидный email": emailValid}})} placeholder="Ваш email"/>
                            <FormErrorMessage>{errors.email?.type}</FormErrorMessage>
                        </FormControl>

                        <FormControl isRequired isInvalid={!!errors.password} mb={15}>
                            <FormLabel>Пароль</FormLabel>
                            <Input {...register('password', {validate: {"Пароль слишком короткий": minLength8}})} placeholder="Ваш пароль" />
                            <FormErrorMessage>{errors.password?.type}</FormErrorMessage>
                        </FormControl>
                        
                        <FormControl isRequired isInvalid={!!errors.repeatPassword}>
                            <FormLabel>Повторите пароль</FormLabel>
                            <Input {...register('repeatPassword')} placeholder="Повторите пароль" />
                            <FormErrorMessage>{errors.repeatPassword?.message}</FormErrorMessage>
                        </FormControl>
                        
                        <Button mt={15} w="100%" alignSelf="center" colorScheme="blue" type="submit">Регистрация</Button>
                    </form>
            </Box>
        </>
        
    )
}

RegisterPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    )
}

export default RegisterPage