<script setup>
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { Mathematics } from "@tiptap/extension-mathematics";
import "katex/dist/katex.min.css";

const editor = useEditor({
  extensions: [
    StarterKit,
    Mathematics.configure({
      inlineOptions: {
        onClick: (node, pos) => {
          const katex = prompt("編輯行內公式：", node.attrs.latex);
          if (katex !== null) {
            // 使用 editor.value 取得實例並執行命令
            editor.value
              .chain()
              .focus()
              .updateInlineMath({ latex: katex })
              .run();
          }
        },
      },
      blockOptions: {
        onClick: (node, pos) => {
          const katex = prompt("編輯區塊公式：", node.attrs.latex);
          if (katex !== null) {
            editor.value.commands.updateBlockMath({ latex: katex });
          }
        },
      },
      katexOptions: {
        throwOnError: false,
        macros: {
          "\\R": "\\mathbb{R}",
        },
      },
    }),
  ],
  content: ``,
});

// --- 功能邏輯 ---

const toggleEditing = () => {
  editor.value.setEditable(!editor.value.isEditable);
};

const onInsertInlineMath = () => {
  editor.value
    .chain()
    .focus()
    .insertInlineMath({ latex: "e^{i\\pi} + 1 = 0" })
    .run();
};

const onInsertBlockMath = () => {
  editor.value
    .chain()
    .focus()
    .insertBlockMath({
      latex: "\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}",
    })
    .run();
};

const onRemoveMath = () => {
  // Tiptap 會根據游標位置自動處理刪除
  editor.value.chain().focus().deleteSelection().run();
};
const onInsertBlockWithPrompt = () => {
  const newLatex = prompt("請輸入 LaTeX 公式：", "\\sum_{i=1}^{n} i");

  if (newLatex) {
    editor.value.chain().focus().insertBlockMath({ latex: newLatex }).run();
  }
};
</script>

<template>
  <div v-if="editor">
    <div class="control-group">
      <div class="button-group flex gap-1">
        <UButton
          icon="i-heroicons-pencil-square"
          @click="onInsertBlockWithPrompt"
        ></UButton>
        <UButton icon="i-heroicons-variable" @click="onInsertInlineMath"
          >Inline</UButton
        >
        <UButton icon="i-heroicons-variable" @click="onInsertBlockMath"
          >Block</UButton
        >
        <UButton icon="i-heroicons-trash" @click="onRemoveMath"></UButton>
      </div>
    </div>

    <editor-content :editor="editor" class="editor-content" />
  </div>
</template>

<style scoped>
/* 數學節點的基本樣式 */
.editor-content :deep(.Tiptap-mathematics-editor) {
  background: rgba(66, 184, 131, 0.1);
  border-radius: 4px;
  padding: 0 4px;
  cursor: pointer;
  transition: background 0.2s;
}

.editor-content :deep(.Tiptap-mathematics-editor:hover) {
  background: rgba(66, 184, 131, 0.2);
}

/* 編輯器容器樣式 */
.editor-content :deep(.tiptap) {
  border: 2px solid #ddd;
  padding: 1rem;
  min-height: 200px;
  border-radius: 8px;
  outline: none;
}

.editor-content :deep(.tiptap:focus) {
  border-color: #42b883;
}

/* 區塊公式（Display Mode）置中樣式 */
.editor-content :deep(.Tiptap-mathematics-render--display) {
  display: block;
  text-align: center;
  margin: 1.5rem 0;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 4px;
}
</style>
