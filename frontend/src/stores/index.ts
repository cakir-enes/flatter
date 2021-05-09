import { Writable, writable, Readable, Subscriber, Unsubscriber, Updater, get } from "svelte/store"
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
            if (topic) {
                update(self => {
                    self.push(topic)
                    return self
                })
            }

            return topic
        },


    }
}
const backend = new Backend()
const ts = createTopicStore(backend)

export const activeTopic = (() => {
    const _ref = writable<RTopic>(null)
    return {
        subscribe: _ref.subscribe,
        get ref() {
            return get(_ref)
        },
        async activate(id?: string, target?: { stream: string, topic: string }) {
            let topic = get(ts).find(t => (get(t).id === id))
                || await ts.loadTopic(id)
                || await ts.newTopic(target.stream, target.topic)
            _ref.set(topic)
            // ref = topic
            console.log("ahhaaa ", get(this.ref))
        }
    }
})()

export default ts
