import { Editor } from "@tiptap/core";
import Bold from "@tiptap/extension-bold";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import { defaultExtensions } from "@tiptap/starter-kit";

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