<template>
  <div
    ref="messagesWrapperRef"
    class="messages-wrapper relative-position no-wrap overflow-auto column"
  >
    <load-messages-detector @on-trigger="loadMessages" />
    <message-item
      v-for="message in messageList"
      :key="message._id"
      :message="message"
    />
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, nextTick, onMounted, PropType, shallowRef, watch} from "vue";
import Message from "@/models/message.util";
import MessageItem from "@/components/messenger/messenger-work-area/message-item.vue";
import {IDialog} from "@/models/messenger";
import {useStore} from "vuex";
import LoadMessagesDetector
  from "@/components/messenger/messenger-work-area/load-messages-detector.vue";

export default defineComponent({
  name: 'MessagesWrapper',
  components: {LoadMessagesDetector, MessageItem},
  props: {
    messageList: {
      type: Array as PropType<(Message & {_id: string})[]>,
      default: () => ([])
    },
    dialog: {
      type: Object as PropType<IDialog>,
      default: undefined
    }
  },
  emits: ['loadMessages'],
  setup(props, {emit}) {
    const $store = useStore();
    const messagesWrapperRef = shallowRef<HTMLElement>();

    watch(
      () => props.dialog,
      () => scrollToLastMessage(),
      {
        deep: true
      }
    )

    const lastMessageByCurrentUser = computed<Message & {_id: string} | undefined>(() => (
      props.messageList?.find(({senderLogin}) => senderLogin === $store.getters['userModule/userData'].login)
    ));

    watch(
      () => lastMessageByCurrentUser.value,
      (val, oldVal) => (val?._id !== oldVal?._id) && scrollToLastMessage()
    )

    const scrollToLastMessage = async () => {
      await nextTick();
      messagesWrapperRef.value?.scroll({top: messagesWrapperRef.value?.scrollHeight});
    }

    const loadMessages = () => emit('loadMessages');

    onMounted(() => {
      scrollToLastMessage();
    })

    return {
      lastMessageByCurrentUser,
      messagesWrapperRef,
      loadMessages
    }
  }
})
</script>

<style lang="scss">
.messages-wrapper {
  padding: 12px;

  .load-messages-detector {
    width: 100%;
    position: absolute;
    top: 0;
  }

  .message--by-current-user {
    align-self: end;
  }
}
</style>
