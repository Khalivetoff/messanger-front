<template>
  <div class="messenger-work-area flex column">
    <template v-if="activeDialog">
      <messenger-work-area-title
        :active-dialog="activeDialog"
        @close-dialog="closeDialog"
      />
      <messages-wrapper
        :message-list="activeDialog?.messageList || []"
        :active-dialog="activeDialog"
        @load-messages="loadMessageList"
      />
      <messenger-editor
        v-model="internalMessageText"
        :active-dialog="activeDialog"
        @send-message="sendMessage"
      />
    </template>
    <span
      v-else
      class="no-data-info"
    >
      Выбери собеседника и начни общаться
    </span>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, PropType} from "vue";
import {IDialog} from "@/models/messenger";
import MessengerWorkAreaTitle
  from "@/components/messenger/messenger-work-area/messenger-work-area-title.vue";
import MessagesWrapper from "@/components/messenger/messenger-work-area/messages-wrapper.vue";
import MessengerEditor from "@/components/messenger/messenger-work-area/messenger-editor.vue";

export default defineComponent({
  name: 'MessengerWorkArea',
  components: {MessengerEditor, MessagesWrapper, MessengerWorkAreaTitle},
  props: {
    activeDialog: {type: Object as PropType<IDialog>, default: undefined},
    messageText: {type: String as PropType<string>, default: ''}
  },
  emits: ['closeDialog', 'loadMessages', 'sendMessage', 'update:messageText'],
  setup(props, {emit}) {
    const title = computed(() => props.activeDialog?.name);

    const internalMessageText = computed({
      get() {
        return props.messageText;
      },
      set(val: string) {
        emit('update:messageText', val);
      }
    })

    const closeDialog = (): void => {
      emit('closeDialog');
    }

    const loadMessageList = (): void => {
      emit('loadMessages');
    }

    const sendMessage = (messageText: string): void => {
      emit('sendMessage', messageText);
    }

    return {
      title,
      internalMessageText,
      loadMessageList,
      closeDialog,
      sendMessage
    }
  }
})
</script>

<style lang="scss">
.messenger-work-area {
  border-left: solid 1px #d9d9d9;
  flex: 1;
  flex-wrap: nowrap;

  .no-data-info {
    margin: auto;
    color: #999;
  }

  &-title {
    flex: 0;
  }

  .messages-wrapper {
    flex: 1;
  }

  .messenger-editor {
    flex: 0;
    min-height: 80px;
    margin: 12px;
  }
}
</style>
