// export enum

interface EditorBlock {
    id: string
    type: string
}

export interface EditorOutput<T> {
    time: number
    blocks: EditorBlock[]
}