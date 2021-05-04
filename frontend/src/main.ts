import App from './App.svelte';

import * as Wails from '@wailsapp/runtime';

let app;
app = new App({
	target: document.body,
});
// Wails.Init(() => {

// });

export default app;