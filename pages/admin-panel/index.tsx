import { useEffect, useState } from 'react'
import { MainLayout } from "@/layouts/MainLayout";
import { Button, useColorMode } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { NextPageWithLayout } from "../_app";
import { AppContainer } from '@/components/AppContainer/AppContainer';
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




const AdminPanelPage: NextPageWithLayout = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    const [editorInstance, setEditorInstance] = useState<any>()
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

    const onShow = async () => {
        try {
            const output = await editorInstance.save()
            output
        } catch(e) {
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
        <EditorJS data={editorValue} setData={setEditorValue} setEditorInstance={setEditorInstance} />

        <AppContainer>
            <Button onClick={onShow}>Показать</Button>
        </AppContainer>
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