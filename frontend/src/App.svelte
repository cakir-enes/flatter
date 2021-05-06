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

  export let themeSettings = {
    font: {
      family: "Merriweather, serif",
    },
    main: {
      background: "white",
    },
    colors: {
      primary: "#26292C",
      text: "#f5f3f5ff",
      bg2: "#66a182ff",
      accent: "#f0c808ff",
      other: "#6883baff",
    },
  };

  function encodeB64(str) {
    return btoa(str);
  }

  function makeCSSVars(settings, prefix = "-") {
    return Object.entries(settings)
      .flatMap(([key, value]) => {
        const path = prefix + "-" + key;
        if (typeof value === "object") return makeCSSVars(value, path);
        else return `${path}:${value};`;
      })
      .join("\n");
  }

  $: themeCSS = `:root {${makeCSSVars(themeSettings)}}`;
</script>

<link rel="stylesheet" href="data:text/css;base64,{encodeB64(themeCSS)}" />
<link rel="stylesheet" href="https://unpkg.com/ress/dist/ress.min.css" />

<svelte:window on:keydown={handleKeyDown} />

<main>
  <Editor bind:activeStream {show} />
  <Stream title="Stream 1" />
</main>

<style lang="scss">
  :global(body) {
    background: #1e1f1f;
    color: var(--colors-text);

    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
