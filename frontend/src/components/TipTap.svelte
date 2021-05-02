<script lang="ts">
    import { Editor, posToDOMRect } from "@tiptap/core";
    import RefFinder from "./RefFinder.svelte";
    import { tiptapEditor } from "../actions";

    export let show: boolean = false;

    let element;
    let editor: Editor;
    let showRef = false;
    let refRect: ClientRect = {
        left: 0,
        top: 0,
        width: 0,
        bottom: 0,
        height: 0,
        right: 0,
    };

    function position() {
        const { state, composing } = editor.view;
        const { doc, selection } = state;

        const { from, to, empty, $anchor } = selection;
        let rect = posToDOMRect(editor.view, from, to);
        const { left, width, y } = editor.view.dom.getBoundingClientRect();

        refRect = {
            left: 180,
            top: rect.top + rect.height,
            width: width,
            bottom: 0,
            height: window.innerHeight - y,
            right: 0,
        };
    }

    $: {
        if (show && !showRef) {
            editor.chain().focus();
        }
        if (!show) {
            showRef = false;
        }
    }

    function handleKeyDown(e: KeyboardEvent) {
        if (e.ctrlKey) {
            e.stopPropagation();
            if (e.key === " " && show) {
                position();
                showRef = !showRef;
            }
        } else {
            showRef = false;
        }
    }
</script>

<RefFinder rect={refRect} show={showRef} />

<div
    class="editor"
    class:show
    on:keydown={handleKeyDown}
    use:tiptapEditor={{
        init: (e) => {
            editor = e;
        },
    }}
>
    {#if editor}
        <button
            on:click={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()}
            class:active={editor.isActive("heading", { level: 1 })}
        >
            H1
        </button>
        <button
            on:click={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()}
            class:active={editor.isActive("heading", { level: 2 })}
        >
            H2
        </button>
        <button
            on:click={() => editor.chain().focus().setParagraph().run()}
            class:active={editor.isActive("paragraph")}
        >
            P
        </button>
    {/if}
    <div class="editorx" bind:this={element} />
</div>

<style lang="scss">
    .editor {
        width: 100%;
        max-width: 80ch;
        z-index: -1;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        max-height: 90%;
        background: #023;
        opacity: 0;
    }

    .show {
        z-index: 10;
        opacity: 1;
    }
</style>
