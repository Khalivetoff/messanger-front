<template>
  <div class="dialog-list-item full-width column">
    <span class="dialog-list-item__title">
      {{ dialog.name }}
    </span>
    <span
      v-if="lastMessage"
      class="dialog-list-item__last-message"
    >
      {{ lastMessage?.text }}
    </span>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, PropType} from "vue";
import {IDialog} from "../../models/messenger";
import Message from "@/models/message.util";

export default defineComponent({
  name: 'DialogListItem',
  props: {
    dialog: {
      type: Object as PropType<IDialog>
    }
  },
  setup(props) {
    const lastMessage = computed<Message | undefined>(() => props.dialog?.messageList?.[props.dialog?.messageList.length - 1]);

    return {
      lastMessage
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
  }
}
</style>
