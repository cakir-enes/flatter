import App from './App.svelte';

import * as Wails from '@wailsapp/runtime';
import Backend from './stores/Backend';
import { createTopicStore } from './stores';

let app;

// Wails.Init(() => {
// 	app = new App({
// 		target: document.body,
// 	});
// });

const backend = new Backend()
const ts = createTopicStore(backend)

app = new App({
	target: document.body,
});

export default app;