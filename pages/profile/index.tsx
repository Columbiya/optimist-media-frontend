import { AppContainer } from "@/components/AppContainer/AppContainer";
import { ProfileImage } from "@/components/ProfileImage/ProfileImage";
import { MainLayout } from "@/layouts/MainLayout";
import { useAuthStore } from "@/store/authStore";
import { useUserStore } from "@/store/useUserStore";
import { ROUTES } from "@/utils/ROUTES";
import { AlertDialog, 
    AlertDialogBody, 
    AlertDialogContent, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogOverlay, 
    Button, 
    Grid, 
    GridItem, 
    Heading, 
    Spinner, 
    useDisclosure, 
    useToast, 
    VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { NextPageWithLayout } from "../_app";

const ProfilePage: NextPageWithLayout = (props) => {
    const { user, isAuthenticated, loaded } = useAuthStore()
    const { id, articles, email, username, fetchUserDetails, loaded: userLoaded, profilePhoto, setUserProfilePhoto } = useUserStore()
    const [imagePreview, setImagePreview] = useState<string>()
    const [activePhotos, setActivePhoto] = useState<FileList | null>(null)
    const router = useRouter()
    const toast = useToast()
    const ref = useRef<HTMLInputElement>(null)
    const { isOpen, onClose, onOpen } = useDisclosure()
    const alertCancelButtonRef = useRef<HTMLButtonElement>(null)

    const onUploadingSubmit = useCallback(async () => {
        if (!activePhotos || !id) return

        try {
            await setUserProfilePhoto(activePhotos[0], id)

            toast({
                status: 'success',
                title: "Успешно",
                description: 'Изображение успешно изменено',
                duration: 5000,
                isClosable: true
            })

            setImagePreview(undefined)
            onClose()
        } catch(e) {
            toast({
                status: 'error',
                title: 'Ошибка',
                description: 'Что то пошло не так при загрузке изображения на сервер. Попробуйте позже',
                duration: 5000,
                isClosable: true
            })
        }
    }, [activePhotos, id, onClose, setUserProfilePhoto, toast])

    const onCancelUploading = useCallback(() => {
        setImagePreview(undefined)
        setActivePhoto(null)
        onClose()
    }, [onClose])

    useEffect(() => {
        if (!loaded) return

        if (!isAuthenticated && !user) {
            toast({
                status: 'error',
                title: "Ошибка",
                description: "Сначала нужно авторизироваться",
                duration: 5000,
                isClosable: true
            })

            return
        }
        else if (!isAuthenticated && user) {
            router.push(ROUTES.LOGIN)

            return
        }

        async function getUserData() {
            try {
                fetchUserDetails(user?.id || 1)
            } catch(e) {
                toast({
                    status: 'error',
                    title: "Что то пошло не так",
                    description: "Не удалось получить информацию о профиле. Попробуйте позже",
                    duration: 5000,
                    isClosable: true
                })

                console.log(e)
            }
        }

        getUserData()

    }, [user, isAuthenticated, loaded, fetchUserDetails, router, toast])

    useEffect(() => {
        if (!activePhotos || activePhotos.length === 0) {
            setImagePreview(undefined)

            return
        }
        
        const objectUrl = URL.createObjectURL(activePhotos[0])
        setImagePreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [activePhotos])

    if (!loaded || !userLoaded) {
        return <Spinner pos="fixed" top="50%" left="50%" transform="translate(-50%, -50%)" />
    }

    return (
        <>
            <AppContainer>
                <Heading as="h2">
                    {
                        username ? 
                            `Рады вас видеть, ${username}`:
                            'Ваш профиль'
                    }
                </Heading>

                <Grid templateColumns='1fr 1fr'>
                    <GridItem display="flex" justifyContent='flex-start'>
                        <VStack m="0" alignItems='flex-start'>
                            <ProfileImage 
                                fileInputRef={ref} 
                                imageFixedWidth={!profilePhoto && !imagePreview && activePhotos?.length != 0} 
                                imagePreview={imagePreview} 
                                profilePhoto={profilePhoto} />
                            
                            {imagePreview && 
                                <Button onClick={onOpen} display="block" colorScheme='purple' justifySelf='flex-start'>
                                    Загрузить изображение?
                                </Button>
                            }
                        </VStack>
                    </GridItem>

                    <GridItem>
                        asdas
                    </GridItem>
                </Grid>
                
                
                
                <AlertDialog
                        isOpen={isOpen}
                        onClose={onClose}
                        closeOnEsc
                        isCentered
                        leastDestructiveRef={alertCancelButtonRef}
                    >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize='lg' fontWeight="bold">
                                Загрузить фотографию?
                            </AlertDialogHeader>

                            <AlertDialogBody>
                                Вы уверены? Это действие нельзя будет отменить
                            </AlertDialogBody>

                            <AlertDialogFooter>
                                <Button ref={alertCancelButtonRef} colorScheme='red' onClick={onCancelUploading}>
                                    Отмена
                                </Button>
                                <Button colorScheme='green' ml={3} onClick={onUploadingSubmit}>
                                    Загрузить
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>

                <input 
                    ref={ref} 
                    type="file" 
                    style={{display: 'none'}} 
                    accept="image/jpeg, image/jpg, image/png, image/webp"
                    onChange={e => setActivePhoto(e.target.files)} />

            </AppContainer>
        </>
    )
}

ProfilePage.getLayout = function getLayout(page) {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    )
}

export default ProfilePage