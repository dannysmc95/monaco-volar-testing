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
	let codeEditor: unknown;
	const theme = await loadTheme();

	const loadOnigasm = () => onigasm.loadWASM(onigasmWasm);

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
		Promise.all([ loadOnigasm, loadMonacoEnv, prepareVirtualFiles]).then(async () => {
			if (!monacoeditorcontainer.value) return;
			const codeEditor = editor.create(monacoeditorcontainer.value, {
				theme,
				language: 'vue',
				value: '<template>\n\t<div>Hello World</div>\n</template>',
			});
			await loadGrammars(codeEditor);
		});
	});
</script>

<style scoped lang="scss">
	#container {
		width: 100%;
		min-height: 800px;
	}
</style>
