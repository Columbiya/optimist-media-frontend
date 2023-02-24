import { Image, Input } from "@chakra-ui/react"
import { useState, useEffect } from 'react'
import { UseFormRegister } from "react-hook-form"

interface InputFileWithImagePreview {
    name: string
    register: UseFormRegister<any>
}

export const InputFileWithImagePreview: React.FC<InputFileWithImagePreview> = ({ register, name }) => {
    const [fileList, setFileList] = useState<FileList | null>(null)
    const [imagePreview, setImagePreview] = useState<string>("")

    useEffect(() => {
        if (!fileList || !fileList.length) return

        const objectUrl = URL.createObjectURL(fileList[0])
        setImagePreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [fileList])

    return (
        <>
            <Input 
                type="file" 
                {...register(name)}
                onChange={e => setFileList(e.target.files)}
            />

            <Image src={imagePreview} alt="Картинка статьи" />
        </>
    )
}