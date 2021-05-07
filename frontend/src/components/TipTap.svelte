<script lang="ts">
  import Clippy from "./Clippy.svelte";

  import { Editor, posToDOMRect } from "@tiptap/core";
  import RefFinder from "./RefFinder.svelte";
  import { tiptapEditor } from "../actions";

  export let show: boolean = false;
  export let onNewEntry: (content: string) => void;
  export let activeStream: string;

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
      left: left,
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
      editor?.setEditable(true);
    }
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.ctrlKey) {
      e.stopPropagation();
      if (e.key === " " && show) {
        editor.setEditable(false);
        position();
        showRef = !showRef;
      }
    } else {
      showRef = false;
    }
  }
</script>

<div class="container" class:show>
  <RefFinder
    rect={refRect}
    show={showRef}
    onSelection={(id) => {
      showRef = false;
      setTimeout(() => {
        editor.setEditable(true);
        editor.chain().focus().insertNode("ref", { id }).run();
      });
    }}
  />

  <div
    class="editor"
    class:show
    on:keydown={handleKeyDown}
    use:tiptapEditor={{
      init: (e) => {
        editor = e;
      },
      onDone: () => {
        const content = editor.getHTML();
        editor.chain().clearContent().run();
        onNewEntry(content);
      },
    }}
  >
    <Clippy anchor={true} />
  </div>
</div>

{#if !show}
  <Clippy anchor={false} />
{/if}

<style lang="scss">
  :global(.ProseMirror) {
    background: var(--colors-accent) !important;
    color: var(--colors-primary);
    padding: 1.5em;
    border-radius: 4px;
    // box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
    //   rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
    //   rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;

    box-shadow: rgba(0, 0, 0, 0.2) 0px 60px 40px -7px;
    outline: none;
  }

  .container {
    top: 0;
    left: 0;
    position: absolute;
    width: 100vw;
    height: 100vh;
    background: none;
    opacity: 0;
    z-index: -1;
  }

  .editor {
    width: 100%;
    max-width: 80ch;
    z-index: -1;

    margin-left: auto;
    margin-right: auto;
    margin-top: 10%;
    max-height: 90%;
    opacity: 0;
  }

  .show {
    z-index: 10;
    opacity: 1;
  }
</style>
