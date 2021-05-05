<script lang="ts">
  import Stream from "./components/Stream.svelte";
  import Editor from "./components/TipTap.svelte";

  let show = false;
  let activeStream: string;
  let lastFocusedStream: HTMLElement = null;

  const blackKeys = ["Meta", "Tab", "Super", "OS", "Alt"];
  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Escape") {
      show = false;
      lastFocusedStream?.focus();
    } else {
      //   let focusOnBody = document.body === document.activeElement;
      if (!blackKeys.includes(e.key)) show = true;
    }
  }

  window.addEventListener("focusin", (ev: FocusEvent) => {
    const title = ev.target.title;
    if (title) {
      console.count("FOCUSING TO strim");
      lastFocusedStream = ev.target as HTMLElement;
    }
    // document.querySelector(`section[title=`);
  });
</script>

<svelte:window on:keydown={handleKeyDown} />

<main>
  <Editor bind:activeStream {show} />
  <Stream title="Stream 1" />
</main>

<style lang="scss">
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
