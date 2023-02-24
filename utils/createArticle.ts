import { Article } from "@/models/Article"
import axios from "axios"

interface ValuesToCreate {
    title: string
    text: string
    image: File
    userId: string
    subjectId: string
}

export const createArticle = async (values: ValuesToCreate): Promise<Article> => {
    const formData = new FormData()
    formData.append('title', values.title)
    formData.append('text', values.text)
    formData.append('image', values.image)
    formData.append('userId', values.userId)
    formData.append('subjectId', values.subjectId)

    const data = await axios
        .post(`http://localhost:5000/api/articles`, formData, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        .then(res => res.data)

    return data
}