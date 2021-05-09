import { Readable, Subscriber, Unsubscriber, writable, Writable } from "svelte/store";
import type { IEntry, ITopic } from "../types";
import type Backend from "./Backend";


export interface RTopic extends Readable<ITopic> {
    append: (content: string) => void
}

export function createRTopic(backend: Backend, topic: ITopic): RTopic {
    const { subscribe, set, update } = writable<ITopic>(topic)

    return {
        subscribe,

        append: async (content: string) => {
            let entry = await backend.append(topic.id, content)
            update((self) => {
                self.entries.push(entry)
                return self
            })
        }
    }
}


// export class RTopic implements Readable<ITopic> {
//     private s: Writable<ITopic>

//     constructor(topic: ITopic, private backend: typeof Backend) {
//         this.s = writable(topic)
//     }

//     subscribe(run: Subscriber<ITopic>, invalidate?: (value?: ITopic) => void): Unsubscriber {
//         return this.s.subscribe(run, invalidate);
//     }

//     append(content: string, refs: string[]) {
//         this.s.update(self => {
//             const newEntry: IEntry = { content, backlinks: [], refs, createdAt: new Date(), isThread: false }
//             self.entries.push(newEntry)
//             this.backend.append({ stream: self.stream, topic: self.title }, newEntry)
//             return self;
//         })
//     }
// }

