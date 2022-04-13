<template>
  <div class="messenger-editor flex row items-center">
    <textarea
      ref="textareaRef"
      v-model="internalMessageText"
      placeholder="Введи сообщение"
      @keydown.enter.exact.prevent="sendMessage"
    />
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

export default defineComponent({
  name: 'MessengerEditor',
  props: {
    activeDialog: {type: Object as PropType<IDialog>, default: undefined},
    modelValue: {type: String as PropType<string>, default: ''}
  },
  emits: ['update:modelValue', 'sendMessage'],
  setup(props, {emit}) {
    const textareaRef = shallowRef<HTMLElement>();

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
      textareaRef.value?.focus();
    }

    onMounted(() => {
      focusTextField();
    })

    return {
      internalMessageText,
      textareaRef,
      sendMessage
    }
  }
})
</script>

<style lang="scss">
.messenger-editor {
  textarea {
    flex: 1;
    resize: none;
    padding: 8px;
    outline: none;
    border: solid 1px #d9d9d9;
    border-radius: 6px;
    transition: 150ms;

    &:focus {
      border-color: #bdbdbd;
    }
  }

  button {
    margin-left: 14px;
  }
}
</style>
