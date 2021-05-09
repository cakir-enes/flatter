<script lang="ts" context="module">
  import interact from "interactjs";
  // target elements with the "draggable" class
  interact(".draggable")
    .draggable({
      // enable inertial throwing
      inertia: true,
      // keep the element within the area of it's parent
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: document.body,
          endOnly: true,
        }),
      ],
      // enable autoScroll
      autoScroll: true,

      listeners: {
        move: dragMoveListener,
        end(event) {},
      },
    })
    .resizable({
      edges: {
        bottom: true,
        right: true,
        // top   : true,       // Use pointer coords to check for resize.
        // left  : false,      // Disable resizing from left edge.
        // bottom: '.resize-s',// Resize if pointer target matches selector
        // right : handleEl    // Resize if pointer target is the given Element
      },
    });

  function dragMoveListener(event) {
    var target = event.target;
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
    var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

    // translate the element
    target.style.transform = "translate(" + x + "px, " + y + "px)";

    // update the posiion attributes
    target.setAttribute("data-x", x);
    target.setAttribute("data-y", y);
  }

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
</script>

<script lang="ts">
  import { get } from "svelte/store";

  import Stream from "./components/Stream.svelte";
  import Editor from "./components/TipTap.svelte";
  import ts from "./stores";
  import TopicStore from "./stores";
  import type { RTopic } from "./stores/RTopic";
  let activeTopic: RTopic;
  let show = false;
  let activeStream: string;
  let lastFocusedStream: HTMLElement = null;
  let themeSettings = {
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
      lastFocusedStream = ev.target as HTMLElement;
    }
    // document.querySelector(`section[title=`);
  });

  async function onNewEntry(content) {
    if (!activeTopic) {
      activeTopic = await TopicStore.newTopic("garbage", "random");
    }
    activeTopic.append(content);
  }

  $: themeCSS = `:root {${makeCSSVars(themeSettings)}}`;
</script>

<link rel="stylesheet" href="data:text/css;base64,{encodeB64(themeCSS)}" />
<link rel="stylesheet" href="https://unpkg.com/ress/dist/ress.min.css" />

<svelte:window on:keydown={handleKeyDown} />

<main>
  <Editor bind:activeStream {show} {onNewEntry} />
  {#each $TopicStore as rtopic}
    <Stream topic={rtopic} />
  {/each}
  <!-- {#each Object.entries() as [title, entries]}
    <Stream {title} {entries} />
  {/each} -->
</main>

<style lang="scss">
  :global(body) {
    background: #1e1f1f;
    color: var(--colors-text);
    height: 100vh;
    width: 100vw;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
