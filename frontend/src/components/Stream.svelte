<script lang="ts">
  export let title: string;
  export let items: string[] = Array.from({ length: 10 }).map(
    (_, i) => `${i} Message \n Some other stuff`
  );

  let focus = -1;

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "ArrowDown" || e.key === "j") {
      e.stopPropagation();
      if (focus < items.length - 1) focus++;
    } else if (e.key === "ArrowUp" || e.key === "k") {
      e.stopPropagation();
      if (focus > 0) focus--;
    }
  }
</script>

<section {title} tabindex={0} on:keydown={handleKeyDown}>
  <div class="title">Stream:Topic</div>
  <ul class="content">
    {#each items as entry, i}
      <li class:selected={i === focus}>{entry}</li>
    {/each}
  </ul>
</section>

<style lang="scss">
  .title {
  }

  section {
    background: yellow;
    width: 100%;
    max-width: 45ch;
    padding: 0.5em;

    &:focus {
      border: 2px solid black;
    }
  }

  ul {
    width: 20ch;
    background: white;
  }

  li {
    &.selected {
      background: red;
    }
  }
</style>
