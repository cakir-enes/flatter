import App from './App.svelte';

import * as Wails from '@wailsapp/runtime';
import Backend from './stores/Backend';
import { createTopicStore } from './stores';

let app;

Wails.Init(async () => {
	let r = await window.backend.Flat.Append(JSON.stringify({ ID: "asd", Refs: ["contento"], Content: "asdsadas" }))

	console.log(r)
	app = new App({
		target: document.body,
	});
});



// app = new App({
// 	target: document.body,
// });

export default app;