<script lang="ts">
  import { fade } from "svelte/transition";
  export let anchor: boolean;
  export let title;
</script>

<div class="clippy" class:dock={!anchor} transition:fade>
  <div>
    <span>01<br />23</span>
  </div>

  <div class="title">
    <!-- <svg
            class="icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 15l7-7 7 7"
            /></svg
        > -->
    <span>{title}</span>
  </div>

  <div class="toggles">
    <button>
      <svg
        class="icon"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        /></svg
      >
    </button>
    <button>
      <svg
        class="icon"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        /></svg
      >
    </button>
    <button>
      <svg
        class="icon"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        /></svg
      >
    </button>
  </div>
</div>

<style lang="scss">
  .icon {
    width: 2em;
    height: 2em;
  }

  .dock {
    position: fixed;
    bottom: 60px;
    left: 50%;
    transform: translate(-50%, 50%);
    box-shadow: 0px 4px 4px 2px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
  }

  .clippy {
    display: flex;
    justify-content: space-between;
    background: var(--colors-primary);
    padding: 10px;
    & div {
      display: flex;

      align-items: center;
    }

    & .title {
      justify-content: center;
      width: 480px;
    }
  }

  .toggles {
    display: flex;

    > * + * {
      margin-left: 10px;
    }
  }
</style>
