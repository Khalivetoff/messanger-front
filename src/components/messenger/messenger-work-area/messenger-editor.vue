<template>
  <div class="messenger-editor flex row items-center">
    <textarea
      ref="textareaRef"
      v-model="messageText"
      placeholder="Enter message"
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
import {defineComponent, ref, shallowRef} from "vue";

export default defineComponent({
  name: 'MessengerEditor',
  emits: ['sendMessage'],
  setup(props, {emit}) {
    const messageText = ref('');
    const textareaRef = shallowRef<HTMLElement>();

    const clearMessageText = (): void => {
      messageText.value = '';
    }

    const sendMessage = (): void => {
      emit('sendMessage', messageText.value);
      clearMessageText();
      textareaRef.value?.focus();
    }

    return {
      messageText,
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
