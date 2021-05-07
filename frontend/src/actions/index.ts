import { Editor } from "@tiptap/core";
import Bold from "@tiptap/extension-bold";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import { defaultExtensions } from "@tiptap/starter-kit";

// export function pannable(node: HTMLElement) {
//     let x: number;
//     let y: number;

//     function handleMousedown(event: MouseEvent) {
//         x = event.clientX;
//         y = event.clientY;

//         node.dispatchEvent(new CustomEvent('panstart', {
//             detail: { x, y }
//         }));

//         window.addEventListener('mousemove', handleMousemove);
//         window.addEventListener('mouseup', handleMouseup);
//     }

//     function handleMousemove(event: MouseEvent) {
//         const dx = event.clientX - x;
//         const dy = event.clientY - y;
//         x = event.clientX;
//         y = event.clientY;

//         // node.dispatchEvent(new CustomEvent('panmove', {
//         //     detail: { x, y, dx, dy }
//         // }));
//     }

//     function handleMouseup(event: MouseEvent) {
//         x = event.clientX;
//         y = event.clientY;

//         node.dispatchEvent(new CustomEvent('panend', {
//             detail: { x, y }
//         }));

//         window.removeEventListener('mousemove', handleMousemove);
//         window.removeEventListener('mouseup', handleMouseup);
//     }

//     node.addEventListener('mousedown', handleMousedown);

//     return {
//         destroy() {
//             node.removeEventListener('mousedown', handleMousedown);
//         }
//     };
// }

export function tiptapEditor(
    node: HTMLElement,
    params: { init: (Editor) => void, onDone: () => void }
) {
    let e = new Editor({
        element: node,
        editorProps: {
            attributes: {
                class: "editorx",
            },
        },
        extensions: [
            ...defaultExtensions({
                paragraph: { HTMLAttributes: { class: "paroo" } },
            }),
            Bold.extend({
                addKeyboardShortcuts() {
                    return {
                        'Control-Enter': () => {
                            params.onDone()
                            return true
                        },
                    }
                },
            }),
            Highlight,
            Typography,
            Mention,
        ],
        content: "<p>Hello World! 🌍️ </p>",
        onTransaction: () => {
            // force re-render so `editor.isActive` works as expected
            params.init(e);
            // editor = editor;
        },
    });

    return {
        destroy() {
            e.destroy();
        },
    };
}

import { Node, mergeAttributes } from "@tiptap/core";

export type RefOptions = {
    HTMLAttributes: Record<string, any>;
};

export const Mention = Node.create<RefOptions>({

    name: "ref",

    defaultOptions: {
        HTMLAttributes: {
            class: "reference"
        }
    },

    group: "inline",

    inline: true,

    selectable: false,

    atom: true,

    addAttributes() {
        return {
            id: {
                default: null,
                parseHTML: (element) => {
                    return {
                        id: element.getAttribute("data-ref"),
                    };
                },
                renderHTML: (attributes) => {
                    if (!attributes.id) {
                        return {};
                    }

                    return {
                        "data-ref": attributes.id,
                    };
                },
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: "span[data-ref]",
            },
        ];
    },

    renderHTML({ node, HTMLAttributes }) {
        return [
            "span",
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
            `${node.attrs.id}`,
        ];
    },

    renderText({ node }) {
        return `${node.attrs.id}`;
    },

    addKeyboardShortcuts() {
        return {
            Backspace: () =>
                this.editor.commands.command(({ tr, state }) => {
                    let isMention = false;
                    const { selection } = state;
                    const { empty, anchor } = selection;

                    if (!empty) {
                        return false;
                    }

                    state.doc.nodesBetween(anchor - 1, anchor, (node, pos) => {
                        if (node.type.name === this.name) {
                            isMention = true;
                            tr.insertText("", pos, pos + node.nodeSize);

                            return false;
                        }
                    });

                    return isMention;
                }),
        };
    },

    addProseMirrorPlugins() {
        return [
        ];
    },
});