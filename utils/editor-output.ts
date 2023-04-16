export enum BlocksTypes {
    LINK = 'link',
    PARAGRAPH = 'paragraph',
    IMAGE = 'image',
    HEADER = 'header',
    TABLE = 'table',
    LIST = 'list',
    WARNING = 'warning',
    QUOTE = 'quote',
    CHECKLIST = 'checklist',
    DELIMITER = 'delimiter'
}

export type possibleBlocks = 
    BlockImage | BlockParagraph | BlockLink | 
    BlockTable | BlockList | BlockWarning |
    BlockQuote | BlockChecklist | BlockDelimiter

export interface EditorOutput {
    time: number
    blocks: possibleBlocks[]
}

export interface BlockImage {
    id: string,
    type: BlocksTypes.IMAGE,
    data: {
        caption: string
        file: {
            url: string
        }
        stretched: boolean
        withBackground: boolean
        withBorder: boolean
    }
}

export interface BlockParagraph {
    id: string,
    type: BlocksTypes.PARAGRAPH,
    data: {
        text: string
    }
}

export interface BlockLink {
    id: string,
    type: BlocksTypes.LINK,
    data: {
        link: string
        meta: {
            description: string
            image: {
                url: string
            }
            site_name: string
            title: string
        }
    }
}

interface BlockTable {
    id: string,
    type: BlocksTypes.TABLE,
    data: {
        withHeadings: boolean
        content: string[]
    }
}

interface BlockList {
    id: string,
    type: BlocksTypes.LIST,
    data: {
        style: 'unordered' | 'ordered'
        items: string[]
    }
}

interface BlockWarning {
    id: string,
    type: BlocksTypes.WARNING,
    data: {
        title: string
        message: string
    }
}

export interface BlockQuote {
    id: string,
    type: BlocksTypes.QUOTE,
    data: {
        text: string
        caption: string
        alignment: 'left' | 'center'
    }
}

interface BlockChecklist {
    id: string,
    type: BlocksTypes.CHECKLIST,
    data: {
        items: CheckItem[]
    }
}

interface CheckItem {
    id: string,
    text: string
    checked: boolean
}

interface BlockDelimiter {
    id: string,
    type: BlocksTypes.DELIMITER
}