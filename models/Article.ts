export interface Article {
    id: number
    title: string
    text: string
    userId: number
    subjectId: number
    views: number
    articleImage?: string
}