<template>
  <div class="messenger overflow-hidden no-wrap flex row">
    <dialog-list
      :dialog-list="dialogList"
      :active-dialog="activeDialog"
      @on-select-dialog="onSelectDialog"
    />
    <messenger-work-area
      v-model:message-text="messageText"
      :active-dialog="activeDialog"
      @close-dialog="deselectDialog"
      @load-messages="loadMessageList"
      @send-message="sendMessage"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent, onBeforeMount, onBeforeUnmount, ref} from 'vue';
import {socket, initSocket, killSocket} from "@/api/messenger.api";
import DialogList from '@/components/messenger/dialog-list.vue';
import {
  ESocketEvents,
  IAddMessageInNewDialogResponse,
  IAddMessageInDialogRequest,
  IAddMessageInNewDialogRequest, IGetMessageListRequest, IGetMessageListResponse
} from "@/models/socket";
import {IDialog, ISourceDialog} from "@/models/messenger";
import {IUserPublic} from "@/models/user";
import MessengerWorkArea from "@/components/messenger/messenger-work-area/messenger-work-area.vue";

export default defineComponent({
  name: 'Messenger',
  components: {
    MessengerWorkArea,
    DialogList
  },
  setup() {
    const userList = ref<IUserPublic[]>([]);
    const dialogList = ref<IDialog[]>([]);
    const activeDialog = ref<IDialog | undefined>();
    const messageText = ref<string>('');

    const onInit = (data: { userList: IUserPublic[], dialogList: ISourceDialog[] }): void => {
      userList.value = data.userList;
      dialogList.value = data.userList.map(({login, name}) => {
        const dialog = data.dialogList.find((
          {
            participantLoginList,
            isGroup
          }
        ) => participantLoginList.includes(login) && !isGroup);
        return {
          _id: dialog?._id,
          login,
          name,
          messageList: dialog?.messageList || [],
          participantLoginList: dialog?.participantLoginList || [],
          isGroup: dialog?.isGroup || false,
          isAllMessagesReceived: dialog ? dialog.isAllMessagesReceived : true
        }
      })

      socket.on(ESocketEvents.Message, onGetMessage);
      socket.on(ESocketEvents.DialogCreate, onCreateDialog);
      socket.on(ESocketEvents.GetMessageList, onGetMessageList);
    }

    const onSelectDialog = (index: number): void => {
      clearMessageText();
      activeDialog.value = dialogList.value[index];
    }

    const deselectDialog = () => {
      clearMessageText();
      activeDialog.value = undefined;
    }

    const loadMessageList = async (): Promise<void> => {
      if (!activeDialog.value || activeDialog.value?.isAllMessagesReceived) {
        return;
      }
      !activeDialog.value?.isAllMessagesReceived && socket.emit(
        ESocketEvents.GetMessageList,
        {
          dialogId: activeDialog.value?._id,
          messageIndex: activeDialog.value?.messageList.length
        } as IGetMessageListRequest);
    }

    const clearMessageText = (): void => {
      messageText.value = '';
    }

    const sendMessage = async (): Promise<void> => {
      if (activeDialog.value?._id) {
        await sendMessageToDialog(activeDialog.value?._id as string, messageText.value);
        return;
      }
      await sendMessageToCompanion(activeDialog.value?.login as string, messageText.value);
    }

    const sendMessageToCompanion = async (companionLogin: string, text: string): Promise<void> => {
      socket.emit(ESocketEvents.AddMessageInNewDialog, {
        companionLogin,
        text
      } as IAddMessageInNewDialogRequest);
    }

    const sendMessageToDialog = async (dialogId: string, text: string): Promise<void> => {
      socket.emit(ESocketEvents.AddMessageInDialog, {
        dialogId,
        text
      } as IAddMessageInDialogRequest);
    }

    const isActiveDialog = (dialogId: string): boolean => activeDialog.value?._id === dialogId;

    const getDialogById = (dialogId: string): IDialog | undefined => {
      return dialogList.value.find((dialog) => dialog._id === dialogId)
    }

    const onGetMessage = (data: IAddMessageInNewDialogResponse): void => {
      const dialog = getDialogById(data.dialogId);
      if (!dialog) {
        return;
      }
      dialog?.messageList.push(data.message);
      isActiveDialog(dialog._id as string) && clearMessageText();
    }

    const onGetMessageList = (data: IGetMessageListResponse): void => {
      const dialog = getDialogById(data.dialogId);
      if (!dialog) {
        return;
      }
      dialog.isAllMessagesReceived = data.isAllMessagesReceived;
      dialog.messageList = [...data.messageList, ...dialog.messageList];
    }

    const onCreateDialog = (data: IDialog): void => {
      if (!data.isGroup) {
        const dialog = dialogList.value.find((dialog) => dialog.participantLoginList.includes(data.login) || data.participantLoginList.includes(dialog.login));
        if (dialog) {
          dialog._id = data._id;
          dialog.messageList = data.messageList;
          isActiveDialog(dialog._id as string) && clearMessageText();
          return;
        }
        dialogList.value.push(data);
        return;
      }
      //FIXME: group logic
    }

    onBeforeMount(() => {
      socket.on(ESocketEvents.Init, onInit);
      initSocket();
    })

    onBeforeUnmount(() => {
      socket.off(ESocketEvents.Message, onGetMessage);
      socket.off(ESocketEvents.DialogCreate, onCreateDialog);
      socket.off(ESocketEvents.GetMessageList, onGetMessageList);
      socket.off(ESocketEvents.Init, onInit);
      killSocket();
    })

    return {
      dialogList,
      userList,
      activeDialog,
      messageText,
      sendMessage,
      deselectDialog,
      onSelectDialog,
      loadMessageList
    }
  }
})
</script>

<style lang="scss">
.messenger {

  .dialog-list {
    width: 30%;
  }

  .messenger-work-area {
    flex-grow: 1;
    flex-shrink: 0;
  }
}
</style>
