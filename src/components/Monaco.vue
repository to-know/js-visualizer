<template>
  <div>
    <Monaco
        height="600"
        language="javascript"
        :code="code"
        :options="options"
        :highlighted="highlightLines"
        @mounted="onMounted"
        @codeChange="onCodeChange"
        >
    </Monaco>
  </div>
</template>

<script>
import Monaco from 'vue-monaco-editor';
import markdown from '../utils/markdown';

module.exports = {
  components: {
    Monaco
  },
  props: ['code', 'currentLine', 'lastLine'],
  computed: {
    highlightLines() {
      return [
        {
          number: this.currentLine || 0,
          class: 'primary-highlighted-line'
        },
        {
          number: this.lastLine || 0,
          class: 'secondary-highlighted-line'
        }
      ];
    }
  },
  methods: {
    onMounted(editor) {
      this.editor = editor;
    },
    onCodeChange(editor) {
      this.$emit('codeChanged', editor.getValue());
    }
  },
  created() {
    this.options = {
      selectOnLineNumbers: false
    };
  }
};
</script>

<style media="screen">
  .secondary-highlighted-line {
    background: rgba(0, 128, 0, 0.10);
  }
  .primary-highlighted-line {
    background: rgba(0, 128, 0, 0.40);
  }
</style>
