<template>
	<div id="container" ref="monacoeditorcontainer"></div>
</template>

<script setup lang="ts">
	import * as onigasm from 'onigasm';
	import onigasmWasm from 'onigasm/lib/onigasm.wasm?url';
	import editorWorker from 'monaco-editor-core/esm/vs/editor/editor.worker?worker';
	import vueWorker from 'monaco-volar/vue.worker?worker';
	import { editor } from 'monaco-editor-core';
	import { loadGrammars, loadTheme, prepareVirtualFiles } from 'monaco-volar';
	import { onMounted, ref } from 'vue';

	const monacoeditorcontainer = ref<HTMLElement | null>(null);
	let editorInstance: unknown;

	const loadOnigasm = async () => onigasm.loadWASM(onigasmWasm);

	const loadMonacoEnv = () => {
		(self as any).MonacoEnvironment = {
			async getWorker(_: any, label: string) {
				if (label === "vue") {
					return new vueWorker();
				}
				return new editorWorker();
			},
		};
	}

	onMounted(() => {
		Promise.all([ loadMonacoEnv(), loadOnigasm(), loadTheme() ]).then(([ , , theme]) => {

			// Check for valid element.
			if (!monacoeditorcontainer.value) return;

			// Prepare the virtual files.
			prepareVirtualFiles();

			// Create the editor.
			const editorInstance = editor.create(monacoeditorcontainer.value, {
				theme,
				language: 'vue',
				automaticLayout: true,
				scrollBeyondLastLine: false,
				minimap: {
					enabled: false,
				},
				inlineSuggest: {
					enabled: false,
				},
				value: '<template>\n\t<div>Hello World</div>\n</template>',
			});

			loadGrammars(editorInstance);
		});
	});
</script>

<style scoped lang="scss">
	#container {
		width: 100%;
		min-height: 800px;
	}
</style>
