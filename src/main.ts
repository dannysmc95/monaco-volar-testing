import { createApp } from 'vue';
import App from './App.vue';
import Router from './router';

import 'monaco-editor-core';
import 'monaco-volar';

createApp(App)
	.use(Router)
	.mount('#app');
