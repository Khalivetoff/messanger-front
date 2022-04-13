<template>
  <div class="dialog-list-item full-width column">
    <span class="dialog-list-item__title">
      {{ dialog.name }}
    </span>
    <div
      v-if="lastMessage"
      class="dialog-list-item__last-message"
    >
      <span
        v-show="isLastMessageByCurrentUser"
        class="dialog-list-item__message-by-current-user"
      >
        ты:
      </span>
      {{ lastMessage?.text }}
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, PropType} from "vue";
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
    const lastMessage = computed<IMessage | undefined>(() => props.dialog?.messageList?.[props.dialog?.messageList.length - 1]);

    const isLastMessageByCurrentUser = computed<boolean>(() => lastMessage.value?.senderLogin === $store.getters['userModule/userData']?.login);

    return {
      lastMessage,
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
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    white-space: nowrap;
  }

  &__message-by-current-user {
    color: #7f7f7f;
  }
}
</style>
