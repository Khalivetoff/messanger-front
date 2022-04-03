<template>
  <div class="messages-wrapper column">
    <message-item
      v-for="message in messageList"
      :key="message._id"
      :message="message"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import Message from "@/models/message.util";
import MessageItem from "@/components/messenger/messenger-work-area/message-item.vue";

export default defineComponent({
  name: 'MessagesWrapper',
  components: {MessageItem},
  props: {
    messageList: {
      type: Array as PropType<(Message & {_id: string})[]>,
      default: () => ([])
    }
  }
})
</script>

<style lang="scss">
.messages-wrapper {
  padding: 12px;

  .message--by-current-user {
    align-self: end;
  }
}
</style>
