<template>
	<CodeMirror
		v-model:value="code"
		:options="editorOptions"
		border
		placeholder="Enter code..."
		height="800"
		@change="change"
	/>
</template>

<script setup lang="ts">
	import CodeMirror from 'codemirror-editor-vue3';
	import 'codemirror/mode/javascript/javascript.js';
	import 'codemirror/mode/htmlmixed/htmlmixed.js';
	import 'codemirror/mode/css/css.js';
	import 'codemirror/mode/vue/vue.js';
	import 'codemirror/theme/dracula.css';
	import { ref } from 'vue';

	const code = ref('<template>\n\t<button @click="count++">{{ count }}</p>\n</template>\n\n<script setup lang="ts">\n\timport { ref } from \'vue\';\n\tconst count = ref(0);\n\<\/script>');
	const editorOptions = ref({
		mode: 'vue',
		theme: 'dracula',
		lineNumbers: true,
		smartIndent: true,
		indentUnit: 4,
		foldGutter: false,
		styleActiveLine: true,
		indentWithTabs: true,
		tabSize: 4,
	});

	const change = () => {
		console.log('Code Changed!');
	};
</script>

<style scoped lang="scss">
	#container {
		width: 100%;
		min-height: 800px;
	}
</style>
