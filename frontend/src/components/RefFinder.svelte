<script lang="ts">
  import { afterUpdate, onMount } from "svelte";

  import type { RefFinderEvents } from "../types";

  export let rect: ClientRect;
  export let show: boolean;
  export let onSelection: (id: string) => void;

  let container: HTMLDivElement;
  let query: HTMLInputElement;
  let opts = Array.from({ length: 10 }).map((_, i) => `OPT-${i}`);
  let focused = -1;
  let list: HTMLUListElement;

  $: {
    if (container) {
      container.style.left = rect.left + "px";
      container.style.top = rect.top + "px";
      container.style.width = rect.width + "px";
      container.style.height = rect.height + "px";
    }
  }

  $: {
    if (show) {
      setTimeout(() => query.focus());
    }
  }

  $: {
    if (focused != -1 && list) {
      // console.log();
      // (document.activeElement as any).blur();
      (list.children[focused] as any).focus();
    }
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      onSelection("asd");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (focused < list.children.length - 1) focused++;
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (focused > 0) focused--;
    }
  }
</script>

{#if show}
  <div bind:this={container} class="container" on:keydown={handleKeyDown}>
    <input type="text" tabindex={1} bind:this={query} />
    <ul bind:this={list}>
      {#each opts as opt}
        <li tabindex={0}>opt</li>
      {/each}
    </ul>
  </div>
{/if}

<style lang="scss">
  .container {
    position: absolute;
    background: blue;
    z-index: 100;
  }

  ul {
    list-style: none;
  }

  li {
    background: white;
  }

  li:focus {
    background: red;
  }
</style>
