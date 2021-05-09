
export type IEntry = {
    id: string
    content: string
    createdAt: Date
    refs: string[]
    backlinks: string[]
    isThread: boolean
}

export interface IStream {
    id: string
    title: string
    entries: IEntry[]
    createdAt: Date
}

export interface ITopic {
    id: string
    stream: string
    title: string
    entries: IEntry[]
    createdAt: Date
}
