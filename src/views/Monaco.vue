<template>
	<div id="container" ref="editorcontainer"></div>
</template>

<script setup lang="ts">
	import { editor } from 'monaco-editor';
	import { onMounted, ref } from 'vue';
	const editorcontainer = ref<HTMLElement | null>(null);
	let codeEditor: unknown;

	onMounted(() => {
		if (!editorcontainer.value) return;
		codeEditor = editor.create(editorcontainer.value, {
			value: '<template>\n\t<div>Hello World</div>\n</template>',
			language: 'html',
			theme: 'vs-dark',
		});
	});
</script>

<style scoped lang="scss">
	#container {
		width: 100%;
		min-height: 800px;
	}
</style>
