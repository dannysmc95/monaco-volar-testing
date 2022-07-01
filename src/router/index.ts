import { createRouter, createWebHistory } from 'vue-router';

export default createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'Home',
			component: () => import('../views/Home.vue'),
		},
		{
			path: '/monaco',
			name: 'Monaco',
			component: () => import('../views/Monaco.vue'),
		},
		{
			path: '/codemirror',
			name: 'CodeMirror',
			component: () => import('../views/CodeMirror.vue'),
		},
	],
});