<template>
  <div class="messenger-editor flex row items-center">
    <q-field
      class="flex"
      outlined
    >
      <editor-content
        :editor="editor"
        class="flex text-editor"
        @keydown.enter.exact.prevent="sendMessage"
      />
    </q-field>
    <q-btn
      round
      size="sm"
      @click="sendMessage"
    >
      <q-icon name="send" />
    </q-btn>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, PropType, shallowRef, watch} from "vue";
import {IDialog} from "@/models/messenger";
import {ITextEditor} from "@/models/text-editor";
import StarterKit from "@tiptap/starter-kit";
import CharacterCount from "@tiptap/extension-character-count";
import Placeholder from "@tiptap/extension-placeholder";
import {EditorContent, useEditor} from "@tiptap/vue-3";

export default defineComponent({
  name: 'MessengerEditor',
  components: {EditorContent},
  props: {
    activeDialog: {type: Object as PropType<IDialog>, default: undefined},
    modelValue: {type: String as PropType<string>, default: ''}
  },
  emits: ['update:modelValue', 'sendMessage'],
  setup(props, {emit}) {
    const textEditor = shallowRef<ITextEditor>();

    const editor = useEditor({
      editorProps: {
        transformPastedText(text) {
          return text.replace(/\xA0/g, ' ');
        },
        transformPastedHTML(html) {
          return html.replace(/\xA0/g, ' ');
        },
        handleKeyDown(view, event) {
          if (event.key === 'Enter' && !event.shiftKey) {
            return true;
          }
          return false;
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
            strike: false,
          }
        ),
        CharacterCount.configure({limit: 400}),
        Placeholder.configure({
          placeholder: 'Введи сообщение...',
          showOnlyWhenEditable: true
        })
      ],
      onUpdate({editor}) {
        updateModelValue();
        editor.commands.scrollIntoView();
      }
    });

    watch(
      () => props.activeDialog,
      (val) => val && focusTextField()
    )

    watch(
      () => props.modelValue,
      (val: string) => val !== editor.value?.getHTML() && editor.value?.commands.setContent(val)
    )

    const sendMessage = (): void => {
      editor.value?.getText()?.trim() && emit('sendMessage');
      focusTextField();
    }

    const focusTextField = (): void => {
      editor.value?.commands.focus();
    }

    const updateModelValue = (): void => {
      emit('update:modelValue', editor.value?.getHTML());
    }

    onMounted(() => {
      focusTextField();
      updateModelValue();
    })

    return {
      editor,
      textEditor,
      sendMessage
    }
  }
})
</script>

<style lang="scss">
.messenger-editor {

  .q-field {
    max-height: 100%;
    flex: 1;

    .q-field__control {
      max-height: 100%;
      padding: 0px 1px;
      min-height: auto;

      .text-editor {
        width: 100%;
        overflow: auto;
        padding: 1px 0px;
        max-height: 100%;
        outline: none;
        cursor: auto;
        color: #1D1D1D;

        .ProseMirror {
          outline: none;
          width: 100%;

          p.is-empty:first-child::before {
            content: attr(data-placeholder);
            float: left;
            color: #b8b8b8;
            pointer-events: none;
            height: 0;
          }

          p {
            margin: 0px;
          }
        }
      }

      .text-editor {
        width: 100%;
        border: none;

        .ProseMirror {
          padding: 8px;
        }
      }
    }
  }

  button {
    margin-left: 14px;
  }
}
</style>
