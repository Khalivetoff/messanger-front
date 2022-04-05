<template>
  <div class="messenger-work-area flex column self-stretch">
    <template v-if="dialog">
      <messenger-work-area-title
        :dialog="dialog"
        @close-dialog="closeDialog"
      />
      <messages-wrapper
        :message-list="dialog?.messageList || []"
        :dialog="dialog"
        @load-messages="loadMessages"
      />
      <messenger-editor @send-message="sendMessage" />
    </template>
    <span
      v-else
      class="no-data-info"
    >
      Pick the companion and just the chatting
    </span>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, PropType} from "vue";
import {IDialog} from "../../../models/messenger";
import MessengerWorkAreaTitle
  from "@/components/messenger/messenger-work-area/messenger-work-area-title.vue";
import MessagesWrapper from "@/components/messenger/messenger-work-area/messages-wrapper.vue";
import MessengerEditor from "@/components/messenger/messenger-work-area/messenger-editor.vue";

export default defineComponent({
  name: 'MessengerWorkArea',
  components: {MessengerEditor, MessagesWrapper, MessengerWorkAreaTitle},
  props: {
    dialog: {
      type: Object as PropType<IDialog>,
      default: undefined
    }
  },
  emits: ['closeDialog', 'loadMessages', 'sendMessage'],
  setup(props, {emit}) {
    const title = computed(() => props.dialog?.name);

    const closeDialog = (): void => {
      emit('closeDialog');
    }

    const loadMessages = (): void=> {
      emit('loadMessages');
    }

    const sendMessage = (messageText: string): void => {
      emit('sendMessage', messageText);
    }

    return {
      title,
      loadMessages,
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
