import type { IEntry, ITopic } from "../types";
import { createRTopic, RTopic } from "./RTopic";

const wails: any = (window as any).backend

export default class Backend {
    constructor() { }

    async newTopic(stream: string, title: string): Promise<RTopic> {
        let topic: ITopic = { id: "T" + Math.random(), createdAt: new Date(), stream, title, entries: [] }
        return createRTopic(this, topic)
    }

    async append(parentId, content: string): Promise<IEntry> {
        let e: IEntry = { id: parentId + Math.random(), createdAt: new Date(), backlinks: [], content, isThread: false, refs: [] }
        return e
    }

    async loadTopic(id: string): Promise<RTopic> {
        throw Error("aa")
    }
}

