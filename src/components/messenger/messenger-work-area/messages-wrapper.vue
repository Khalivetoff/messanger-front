<template>
  <div
    ref="messagesWrapperRef"
    class="messages-wrapper relative-position no-wrap column items-start"
  >
    <load-messages-detector
      :is-disabled="activeDialog.isLoading"
      @on-trigger="loadMessageList"
    />
    <messages-loading :is-loading="activeDialog.isLoading" />
    <message-item
      v-for="(message, index) in messageList"
      :ref="(el) => messagesRefs[index] = el?.$el"
      :key="message._id"
      :message="message"
    />
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, nextTick, onMounted, PropType, shallowRef, watch} from "vue";
import {IMessage} from "@/models/message";
import MessageItem from "@/components/messenger/messenger-work-area/message-item.vue";
import {IDialog} from "@/models/messenger";
import {useStore} from "vuex";
import LoadMessagesDetector
  from "@/components/messenger/messenger-work-area/load-messages-detector.vue";
import {cloneDeep} from "lodash";
import MessagesLoading from "@/components/messenger/messenger-work-area/messages-loading.vue";

export default defineComponent({
  name: 'MessagesWrapper',
  components: {MessagesLoading, LoadMessagesDetector, MessageItem},
  props: {
    messageList: {type: Array as PropType<IMessage[]>, default: () => ([])},
    activeDialog: {type: Object as PropType<IDialog>, default: undefined}
  },
  emits: ['loadMessages'],
  setup(props, {emit}) {
    const $store = useStore();
    const messagesWrapperRef = shallowRef<HTMLElement>();
    const messagesRefs = shallowRef<HTMLElement[]>([]);

    watch(
      () => props.activeDialog,
      () => scrollToLastMessage()
    )

    watch(
      () => props.messageList[0]?._id,
      async () => {
        if (!props.activeDialog?.isLoading || messagesWrapperRef.value?.scrollTop) {
          return;
        }
        const firstMessageElBeforeUpdate = messagesRefs.value[0];
        if (!firstMessageElBeforeUpdate) {
          return;
        }
        await nextTick();
        firstMessageElBeforeUpdate.scrollIntoView({block: 'start'});
        messagesWrapperRef.value?.scrollTo({top: messagesWrapperRef.value?.scrollTop - 8});
      }
    )

    const lastMessageByCurrentUser = computed<IMessage | undefined>(() => (
      (cloneDeep(props.messageList) as IMessage[] | undefined)?.reverse().find(({senderLogin}) => senderLogin === $store.getters['userModule/userData']?.login)
    ));

    watch(
      () => lastMessageByCurrentUser.value,
      (val, oldVal) => (val?._id !== oldVal?._id) && scrollToLastMessage()
    )

    const scrollToLastMessage = async () => {
      await nextTick();
      messagesWrapperRef.value?.scroll({top: messagesWrapperRef.value?.scrollHeight});
    }

    const loadMessageList = () => emit('loadMessages');

    onMounted(() => {
      scrollToLastMessage();
    })

    return {
      lastMessageByCurrentUser,
      messagesWrapperRef,
      messagesRefs,
      loadMessageList
    }
  }
})
</script>

<style lang="scss">
.messages-wrapper {
  padding: 8px 12px;
  overflow-y: scroll!important;
  overflow-x: hidden!important;

  .load-messages-detector {
    width: 100%;
    position: absolute;
    top: 12px;
  }

  .message--by-current-user {
    align-self: end;
  }

  .message {
    max-width: 85%;
  }
}
</style>
