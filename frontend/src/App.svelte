<script lang="ts">
	import Stream from "./components/Stream.svelte";
	import Editor from "./components/TipTap.svelte";

	let show = false;

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === "Escape") {
			show = false;
		} else {
			show = true;
		}
	}
</script>

<svelte:window on:keydown={handleKeyDown} />

<main>
	<Editor {show} />
	<Stream />
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
