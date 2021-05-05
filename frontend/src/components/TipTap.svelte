<script lang="ts">
  import { Editor, posToDOMRect } from "@tiptap/core";
  import RefFinder from "./RefFinder.svelte";
  import { tiptapEditor } from "../actions";

  export let show: boolean = false;
  export let onNewEntry: (content: string) => void;
  export let activeStream: string;

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
        editor.view.focus();
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
      <input bind:value={activeStream} />
    {/if}
    <div class="editorx" bind:this={element} />
  </div>
</div>

<style lang="scss">
  .container {
    top: 0;
    left: 0;
    position: absolute;
    width: 100vw;
    height: 100vh;
    background: rgba(20, 133, 189, 0.363);
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
    background: #023;
    opacity: 0;
  }

  .show {
    z-index: 10;
    opacity: 1;
  }
</style>
