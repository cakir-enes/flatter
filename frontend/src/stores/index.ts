import { Writable, writable, Readable, Subscriber, Unsubscriber, Updater } from "svelte/store"
import type { IEntry, IStream, ITopic } from '../types'
import Backend from "./Backend"
import type { RTopic } from "./RTopic"



export function createTopicStore(backend: Backend) {
    const { subscribe, set, update } = writable<RTopic[]>([])

    return {
        subscribe,

        newTopic: async (stream: string, title: string) => {
            const topic = await backend.newTopic(stream, title)
            update(self => {
                self.push(topic)
                return self
            })
            return topic
        },

        loadTopic: async (id: string) => {
            const topic = await backend.loadTopic(id)
            update(self => {
                self.push(topic)
                return self
            })
        },


    }
}

const backend = new Backend()
const ts = createTopicStore(backend)
export default ts