<template>
  <div class="dialog-list-item full-width column">
    <span class="dialog-list-item__title">
      {{ data.name }}
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
    data: {
      type: Object as PropType<IDialog>
    }
  },
  setup(props) {
    const lastMessage = computed<Message | undefined>(() => props.data?.messageList?.[props.data?.messageList.length - 1]);

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
    background-color: #e8e8e8;
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
