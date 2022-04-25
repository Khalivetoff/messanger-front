<template>
  <editor-content
    :editor="editor"
    class="flex text-editor"
    @keydown.enter.exact.prevent="onEnter"
  />
</template>

<script lang="ts">
import {defineComponent, onMounted, PropType, watch} from "vue";
import {EditorContent, useEditor} from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import CharacterCount from "@tiptap/extension-character-count";

export default defineComponent({
  name: 'TextEditor',
  components: {EditorContent},
  props: {
    isReadonly: {type: Boolean as PropType<boolean>, default: false},
    modelValue: {type: String as PropType<string>, default: ''}
  },
  emits: ['update:modelValue', 'onEnter'],
  setup(props, {emit}) {

    const editor = useEditor({
      editorProps: {
        transformPastedText(text) {
          return text.replace(/\xA0/g, ' ');
        },
        transformPastedHTML(html) {
          return html.replace(/\xA0/g, ' ');
        }
      },
      parseOptions: {
        preserveWhitespace: false
      },
      content: props.modelValue,
      extensions: [
        StarterKit.configure(
          {
            heading: false,
            bulletList: false,
            orderedList: false,
            codeBlock: false,
            code: false,
            horizontalRule: false,
            strike: false
          }
        ),
        CharacterCount.configure({ limit: 400 })
      ],
      onUpdate({ editor }) {
        emit('update:modelValue', editor.getHTML());
        editor.commands.scrollIntoView();
      }
    });

    watch(
      () => props.isReadonly,
      () => setEditable()
    );

    const setEditable = (): void => {
      editor.value?.setEditable(!props.isReadonly);
    };

    watch(
      () => props.modelValue,
      (val: string) => val !== editor.value?.getHTML() && editor.value?.commands.setContent(val)
    )

    const onEnter = (): void => {
      emit('onEnter');
    }

    const focus = (): void => {
      editor.value?.commands.focus();
    }

    onMounted(() => {
      setEditable();
    })

    return {
      editor,
      focus,
      onEnter
    }
  }
})
</script>

<style lang="scss">
.text-editor {
  width: 100%;
  overflow: hidden;
  padding: 1px 0px;
  cursor: auto;
  color: #1D1D1D;

  .ProseMirror {
    width: 100%;
    outline: none;
    max-height: 100%;
    overflow: auto;

    p {
      margin: 0px;
    }
  }
}
</style>
