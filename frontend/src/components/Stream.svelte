<script lang="ts">
  import type { RTopic } from "../stores/RTopic";
  export let topic: RTopic;

  let focus = -1;
  let selections = {};

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "ArrowDown" || e.key === "j") {
      e.stopPropagation();
      if (focus < $topic.entries.length - 1) focus++;
    } else if (e.key === "ArrowUp" || e.key === "k") {
      e.stopPropagation();
      if (focus > 0) focus--;
    } else if (e.key === " ") {
      e.stopPropagation();
      if (selections[focus]) {
        delete selections[focus];
        selections = selections;
      } else {
        selections[focus] = true;
      }
    }
  }
</script>

<section class="draggable" tabindex={0} on:keydown={handleKeyDown}>
  <div class="heading">
    <span class="stream">{$topic.stream}</span>
    <span class="title">{$topic.title}</span>
  </div>

  <ul class="content">
    {#each $topic.entries as entry, i}
      <li
        class="entry"
        class:focused={i === focus}
        class:selected={selections[i]}
      >
        {@html entry.content}
        <span style="opacity: 0.6; margin-left: 4px"
          >• {entry.createdAt.toLocaleDateString()}
        </span>
      </li>
    {/each}
  </ul>
  <div class="handle" />
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
    padding-bottom: 1em;
    transition: ease 0.4s;
    transition-property: box-shadow;
    overflow: auto;

    box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
      rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
      rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
    &:focus {
      box-shadow: rgba(0, 0, 0, 0.2) 0px 60px 40px -7px;
      // box-shadow: rgba(0, 0, 0, 0.2) 0px 20px 30px;
    }
  }

  .handle {
    width: 70%;
    background: var(--colors-text);
    height: 0.2em;
    margin: 0 auto 0.5em;
    opacity: 0.8;
    margin-top: 1em;
  }
  .heading {
    display: flex;
    flex-direction: column;
  }

  :global(.entry p:last-of-type) {
    display: inline-block;
  }

  .stream {
    opacity: 0.8;
    margin-bottom: -10px;
  }

  ul {
    list-style: none;
  }

  li {
    margin-bottom: 4px;
    padding: 1px 4px;
    line-height: 1.2;

    &.focused {
      border: 1px solid var(--colors-accent);
      border-radius: 2px;
    }

    &.selected {
      & span {
        background-color: var(--colors-accent);
        border-radius: 2px;
        color: var(--colors-primary);
      }
    }
  }
</style>
