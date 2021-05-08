<script lang="ts">
  export let rect: ClientRect;
  export let show: boolean;
  export let onSelection: (id: string) => void;
  export let onCancel: () => void;

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
      container.style.maxHeight = rect.height + "px";
    }
  }

  $: {
    if (show) {
      setTimeout(() => query.focus());
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
    } else if (e.key === "Escape") {
      e.stopPropagation();
      onCancel();
    }
  }
</script>

{#if show}
  <div bind:this={container} class="container" on:keydown={handleKeyDown}>
    <input type="text" tabindex={1} bind:this={query} />
    <ul bind:this={list}>
      {#each opts as opt, i}
        <li class:focused={i == focused}>{opt}</li>
      {/each}
    </ul>
  </div>
{/if}

<style lang="scss">
  .container {
    position: absolute;
    background: var(--colors-primary);
    z-index: 100;
    padding: 1em;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
      rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
      rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
  }

  ul {
    list-style: none;
  }

  input {
    width: 100%;
    padding: 4px;
    color: var(--colors-bg2);
    border: 1px solid var(--colors-bg2);
    border-radius: 4px;
    margin-bottom: 8px;
  }

  li {
    padding: 4px;
    border-radius: 4px;
    &.focused {
      background: var(--colors-accent);
      color: var(--colors-primary);
    }
  }
</style>
