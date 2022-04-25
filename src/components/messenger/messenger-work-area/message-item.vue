<template>
  <div
    class="message column"
    :class="{'message--by-current-user': isCurrentUser}"
  >
    <span
      ref="messageTextRef"
      class="message__text"
    />
    <span class="message__time">{{ parsedTime }}</span>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, PropType, shallowRef, watch} from "vue";
import {IMessage} from "@/models/message";
import {useStore} from "vuex";
import moment from "moment";

export default defineComponent({
  name: 'Message',
  props: {
    message: {
      type: Object as PropType<IMessage>,
      default: undefined
    }
  },
  setup(props) {
    const $store = useStore();
    const messageTextRef = shallowRef<HTMLElement>();
    const isCurrentUser = props.message?.senderLogin === $store.getters['userModule/userData'].login;

    const setMessageTextContent = (content: string | undefined): void => {
      if (!messageTextRef.value || !content) {
        return;
      }
      messageTextRef.value.innerHTML = content;
    }

    const parsedTime = computed(() => moment(props.message?.sendTime).locale('ru').format('lll'));

    watch(
      () => props.message,
      (value: undefined | IMessage) => setMessageTextContent(value?.text)
    )

    onMounted(() => {
      setMessageTextContent(props.message?.text);
    })

    return {
      messageTextRef,
      isCurrentUser,
      parsedTime
    }
  }
})
</script>

<style lang="scss">
.message {
  border-radius: 8px;
  padding: 12px;
  background-color: #e5e5e5;
  font-size: 14px;

  &--by-current-user {
    background-color: #d4d8ff;
  }

  &:not(:last-child) {
    margin-bottom: 8px;
  }

  &__time {
    right: 12px;
    bottom: 12px;
    font-size: 10px;
    white-space: nowrap;
    text-align: right;
    margin-top: 8px;
  }
}
</style>
