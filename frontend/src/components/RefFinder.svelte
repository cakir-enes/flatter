<script lang="ts">
  import { afterUpdate, onMount } from "svelte";

  export let rect: ClientRect;
  export let show: boolean;

  let container: HTMLDivElement;
  let query: HTMLInputElement;

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

  function init(el) {
    setTimeout(() => el.focus());
  }
</script>

{#if show}
  <div bind:this={container} class="container">
    <input type="text" tabindex={1} bind:this={query} use:init />
  </div>
{/if}

<style lang="scss">
  .container {
    position: absolute;
    background: blue;
    z-index: 100;
  }
</style>
