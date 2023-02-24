import { useEffect, useState, useMemo } from 'react'
import { MainLayout } from "@/layouts/MainLayout";
import { Button, FormControl, FormErrorMessage, FormLabel, Image, Input, Select, Text, useColorMode, useToast } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { NextPageWithLayout } from "../_app";
import { AppContainer } from '@/components/AppContainer/AppContainer';
import { useForm } from 'react-hook-form';
import { Article } from '@/models/Article'
import { useSubjectsStore } from '@/store/useSubjectsStore'
import { useAuthStore } from '@/store/authStore';
import { createArticle } from '@/utils/createArticle';
const EditorJS = dynamic(() => import("@/components/EditorJS/EditorJS"), {
    ssr: false
})

// declare module '@editorjs/embed'
// declare module '@editorjs/table'
// declare module '@editorjs/paragraph'
// declare module '@editorjs/list'
// declare module '@editorjs/warning'
// declare module '@editorjs/code'
// declare module '@editorjs/link'
// declare module '@editorjs/image'
// declare module '@editorjs/raw'
// declare module '@editorjs/header'
// declare module '@editorjs/quote'
// declare module '@editorjs/marker'
// declare module '@editorjs/checklist'
// declare module '@editorjs/delimiter'
// declare module '@editorjs/inline-code'
// declare module '@editorjs/simple-image'

type CreateArticleValues = Omit<Article, 'id' | 'userId' | 'views' | 'text' | 'articleImage'>


const AdminPanelPage: NextPageWithLayout = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    const [editorInstance, setEditorInstance] = useState<any>()
    const { user } = useAuthStore()
    const { register, formState: { errors }, handleSubmit, reset } = useForm<CreateArticleValues>()
    const { subjects } = useSubjectsStore()
    const [imagePreview, setImagePreview] = useState("")
    const [fileList, setFileList] = useState<FileList | null>(null)
    const toast = useToast()
    const areSubjectsPresent = useMemo(() => {
        return subjects.length !== 0
    }, [subjects])

    const [editorValue, setEditorValue] = useState({
        time: new Date().getTime(),
        blocks: [
          {
            type: "header",
            data: {
              text: "Testing title",
              level: 2
            }
          },
          {
            type: "paragraph",
            data: {
              text:
                "We have been working on this project more than three years. Several large media projects help us to test and debug the Editor, to make it's core more stable. At the same time we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy. 😏"
            }
          }
        ],
        version: "2.1.0"
    })

    useEffect(() => {
        if (!fileList || !fileList.length) return

        const objectUrl = URL.createObjectURL(fileList[0])
        setImagePreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [fileList])

    const onSubmit = async (values: CreateArticleValues) => {
        try {
            const output = await editorInstance.save()

            if (output.blocks === 0) {
                toast({
                    status: 'error',
                    title: 'Пустой контент статьи',
                    description: 'Нужно указать содержание статьи в редакторе',
                    isClosable: true,
                    duration: 5000,
                })

                return
            }

            if (!fileList || !fileList.length) {
                toast({
                    status: 'error',
                    title: 'Статье нужна картинка для превьюшки',
                    description: 'Нужно указать картинку статьи',
                    isClosable: true,
                    duration: 5000,
                })

                return
            }

            const createdArticle = await createArticle({
                title: values.title,
                text: JSON.stringify(output),
                image: fileList[0],
                userId: String(user?.id),
                subjectId: values.subjectId.toString()
            })

            toast({
                status: 'success',
                title: 'Статья создана',
                description: `Статья ${createdArticle.title} успешно создана`,
                isClosable: true,
                duration: 5000
            })

            reset()
        } catch(e) {
            toast({
                status: 'error',
                title: 'Что то пошло не так',
                description: `Произошла ошибка при создании статьи`,
                isClosable: true,
                duration: 5000
            })
            
            console.log(e)
        }
    }

    useEffect(() => {
        if (colorMode === 'dark') {
            toggleColorMode()
        }

        return () => {
            toggleColorMode()
        }
    }, [colorMode])

    return (
       <>
        <AppContainer>
            <form onSubmit={handleSubmit(onSubmit)} style={{maxWidth: 1200, margin: '0 auto'}}>
                <FormControl>
                    <FormLabel>Заголовок статьи</FormLabel>

                    <Input 
                        {...register('title', {required: true})} 
                        size="md"
                        mb={5}
                    />

                    <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
                </FormControl>
                

                <FormControl>
                    <FormLabel>О чем будет статья?</FormLabel>

                    <Select
                        {...register('subjectId', {required: true})}
                        disabled={!areSubjectsPresent}
                        mb={5}
                    >
                        {!areSubjectsPresent && (
                            <option>Subjects не найдены. Нужно создать</option>
                        )}

                        {subjects.map(s => (
                            <option key={s.id} value={s.id}>
                                {s.subject}
                            </option>
                        ))}
                        
                    </Select>

                    <FormErrorMessage>{errors.subjectId?.message}</FormErrorMessage>
                </FormControl>

                <Text mb={15}>Картинка должна быть +- <b>квадратная</b>, чтобы не терялось много деталей</Text>
                <Input 
                    onChange={e => setFileList(e.target.files)}
                    type="file" 
                    accept="image/png, image/jpeg, image/jpg, image/webp, image/svg"
                    mb={5}
                />

                {imagePreview &&
                    <>
                        <Image
                            src={imagePreview}
                            maxW={250}
                            mb={15}
                        />
                    </>
                }

                <Button type="submit">Создать</Button>
            </form>
        </AppContainer>

        <EditorJS data={editorValue} setData={setEditorValue} setEditorInstance={setEditorInstance} />
       </>
    )
}

AdminPanelPage.getLayout = function getLayout(page) {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    )
}

export default AdminPanelPage