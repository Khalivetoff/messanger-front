<template>
  <div class="dialog-list-item full-width column">
    <span class="dialog-list-item__title">
      {{ dialog.name }}
    </span>
    <div
      v-if="lastMessage"
      class="dialog-list-item__last-message flex row no-wrap"
    >
      <span
        v-show="isLastMessageByCurrentUser"
        class="dialog-list-item__message-by-current-user"
      >
        ты:
      </span>
      <div
        ref="lastMessageTextRef"
        class="dialog-list-item__last-message-text"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, PropType, shallowRef, watch} from "vue";
import {IDialog} from "@/models/messenger";
import {IMessage} from "@/models/message";
import {useStore} from "vuex";

export default defineComponent({
  name: 'DialogListItem',
  props: {
    dialog: {type: Object as PropType<IDialog>, default: undefined}
  },
  setup(props) {
    const $store = useStore();
    const lastMessageTextRef = shallowRef<HTMLElement>();
    const lastMessage = computed<IMessage | undefined>(() => props.dialog?.messageList?.[props.dialog?.messageList.length - 1]);
    const isLastMessageByCurrentUser = computed<boolean>(() => lastMessage.value?.senderLogin === $store.getters['userModule/userData']?.login);
    const lastMessageText = computed<string>(() => lastMessage?.value?.text || '');

    const setLastMessageTextContent = (content: string | undefined): void => {
      if (!lastMessageTextRef.value || !content) {
        return;
      }
      lastMessageTextRef.value.innerHTML = content;
    }

    watch(
      () => lastMessageText.value,
      (val: string | undefined) => setLastMessageTextContent(val)
    )

    onMounted(() => {
      setLastMessageTextContent(lastMessageText.value);
    })

    return {
      lastMessage,
      lastMessageTextRef,
      isLastMessageByCurrentUser
    }
  }
})
</script>

<style lang="scss">
.dialog-list-item {
  padding: 8px;
  cursor: pointer;

  &--active {
    background-color: #f5f5f5;
  }

  &__title {
    font-size: 16px;
    font-weight: bold;
  }

  &__last-message {
    max-width: 100%;

    &-text {
      height: 20px;
      overflow: hidden;
      font-size: 14px;
      text-overflow: ellipsis;
      white-space: nowrap;

      p {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }

  &__message-by-current-user {
    color: #7f7f7f;
  }
}
</style>
