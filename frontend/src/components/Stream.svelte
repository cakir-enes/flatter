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
      <li class:selected={i === focus}>
        <span>
          {entry}
        </span>
      </li>
    {/each}
  </ul>
</section>

<style lang="scss">
  .title {
    font-size: 2rem;
    margin-bottom: 0.5em;
  }

  section {
    background: var(--colors-primary);
    width: 100%;
    max-width: 45ch;
    padding: 1.5em;
    transition: ease 0.4s;
    transition-property: box-shadow;

    box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
      rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
      rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
    &:focus {
      box-shadow: rgba(0, 0, 0, 0.2) 0px 60px 40px -7px;
      // box-shadow: rgba(0, 0, 0, 0.2) 0px 20px 30px;
    }
  }

  ul {
    width: 20ch;
    list-style: none;
  }

  li {
    margin-bottom: 4px;
    padding: 1px 4px;
    line-height: 1.2;
    &.selected {
      & span {
        background-color: var(--colors-accent);
        border-radius: 2px;
        color: var(--colors-primary);
      }
    }
  }
</style>
