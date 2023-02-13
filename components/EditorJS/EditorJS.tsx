import { createReactEditorJS } from "react-editor-js";
// const Embed = dynamic(() => import('@editorjs/embed'), {
//     ssr: false
// }) 
// const Table= dynamic(() => import('@editorjs/table'), {
//     ssr: false
// })
// const Paragraph= dynamic(() => import('@editorjs/paragraph'), {
//     ssr: false
// })
// const List=  dynamic(() => import('@editorjs/list'), {
//     ssr: false
// })
// const Warning= dynamic(() => import('@editorjs/warning'), {
//     ssr: false
// })
// const Code= dynamic(() => import('@editorjs/code'), {
//     ssr: false
// })
// const LinkTool= dynamic(() => import('@editorjs/link'), {
//     ssr: false
// })
// const Image= dynamic(() => import('@editorjs/image'), {
//     ssr: false
// })
// const Raw= dynamic(() => import('@editorjs/raw'), {
//     ssr: false
// })
// const Header= dynamic(() => import('@editorjs/header'), {
//     ssr: false
// })
// const Quote= dynamic(() => import('@editorjs/quote'), {
//     ssr: false
// })
// const Marker= dynamic(() => import('@editorjs/marker'), {
//     ssr: false
// })
// const CheckList= dynamic(() => import('@editorjs/checklist'), {
//     ssr: false
// })
// const Delimiter= dynamic(() => import('@editorjs/delimiter'), {
//     ssr: false
// })
// const InlineCode= dynamic(() => import('@editorjs/inline-code'), {
//     ssr: false
// })
// const SimpleImage= dynamic(() => import('@editorjs/simple-image'), {
//     ssr: false
// })
import { useState } from 'react'
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import Warning from "@editorjs/warning";
import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import Image from "@editorjs/image";
import Raw from "@editorjs/raw";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import SimpleImage from "@editorjs/simple-image";
import axios from "axios";

const MyEditor = createReactEditorJS()

interface BlockData {
    text: string
    level?: number
}

interface Block {
    type: string
    data: BlockData
}

interface EditorData {
    time: number
    blocks: Block[]
}

interface EditorJSProps {
    data: EditorData
    setData: (data: any) => void
    setEditorInstance: (editor: any) => void
}

const EditorJS: React.FC<EditorJSProps> = ({ data, setData, setEditorInstance }) => {

    const EDITOR_JS_TOOLS = {
        // NOTE: Paragraph is default tool. Declare only when you want to change paragraph option.
        embed: Embed,
        table: Table,
        list: List,
        warning: Warning,
        code: Code,
        link: LinkTool,
        image: {
            class: Image,
            config: {
                uploader: {
                    async uploadByFile(file: File) {
                        const data = new FormData()
                        data.append('image', file)

                        try {
                            const fileName = await axios.post('http://localhost:5000/api/articles/set-articles-image', data).then(res => res.data)

                            return fileName
                        } catch(e) {
                            console.log(e)
                        }

                    }
                }
            }
        },
        raw: Raw,
        header: Header,
        quote: Quote,
        marker: Marker,
        checklist: CheckList,
        delimiter: Delimiter,
        inlineCode: InlineCode,
    }

    return (
        <>
            <MyEditor onInitialize={(instance) => setEditorInstance(instance)} tools={EDITOR_JS_TOOLS} placeholder="Начни писать статью здесь" onChange={data => setData(data)} />
        </>
    )
}

export default EditorJS