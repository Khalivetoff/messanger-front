<template>
  <div class="messenger-editor flex row items-center">
    <q-field
      class="flex"
      outlined
    >
      <text-editor
        ref="textEditor"
        v-model="internalMessageText"
        @on-enter="sendMessage"
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
import {computed, defineComponent, onMounted, PropType, shallowRef, watch} from "vue";
import {IDialog} from "@/models/messenger";
import TextEditor from '@/components/messenger/text-editor.vue';
import {ITextEditor} from "@/models/text-editor";

export default defineComponent({
  name: 'MessengerEditor',
  components: {TextEditor},
  props: {
    activeDialog: {type: Object as PropType<IDialog>, default: undefined},
    modelValue: {type: String as PropType<string>, default: ''}
  },
  emits: ['update:modelValue', 'sendMessage'],
  setup(props, {emit}) {
    const textEditor = shallowRef<ITextEditor>();

    const internalMessageText = computed({
      get() {
        return props.modelValue;
      },
      set(val: string) {
        emit('update:modelValue', val);
      }
    })

    watch(
      () => props.activeDialog,
      (val) => val && focusTextField()
    )

    const sendMessage = (): void => {
      internalMessageText.value.trim() && emit('sendMessage');
      focusTextField();
    }

    const focusTextField = (): void => {
      textEditor.value?.focus();
    }

    onMounted(() => {
      focusTextField();
    })

    return {
      internalMessageText,
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
