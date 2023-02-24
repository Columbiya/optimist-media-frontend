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

type possibleBlocks = 
    BlockImage | BlockParagraph | BlockLink | 
    BlockTable | BlockList | BlockWarning |
    BlockQuote | BlockChecklist | BlockDelimiter

export interface EditorOutput {
    time: number
    blocks: possibleBlocks[]
}

interface BlockImage {
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

interface BlockParagraph {
    type: BlocksTypes.PARAGRAPH,
    data: {
        text: string
    }
}

interface BlockLink {
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
    type: BlocksTypes.TABLE,
    data: {
        withHeadings: boolean
        content: string[]
    }
}

interface BlockList {
    type: BlocksTypes.LIST,
    data: {
        style: 'unordered' | 'ordered'
        items: string[]
    }
}

interface BlockWarning {
    type: BlocksTypes.WARNING,
    data: {
        title: string
        message: string
    }
}

interface BlockQuote {
    type: BlocksTypes.QUOTE,
    data: {
        text: string
        caption: string
        alignment: 'left' | 'center'
    }
}

interface BlockChecklist {
    type: BlocksTypes.CHECKLIST,
    data: {
        items: CheckItem[]
    }
}

interface CheckItem {
    text: string
    checked: boolean
}

interface BlockDelimiter {
    type: BlocksTypes.DELIMITER
}