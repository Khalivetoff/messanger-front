<template>
  <div class="messenger overflow-hidden no-wrap flex row items-start">
    <dialog-list
      :dialog-list="dialogList"
      :active-dialog="activeDialog"
      @on-select-dialog="onSelectDialog"
    />
    <messenger-work-area
      :dialog="activeDialog"
      @close-dialog="deselectDialog"
      @load-messages="loadMessages"
      @send-message="sendMessage"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent, onBeforeMount, ref} from 'vue';
import initSocket, {socket} from "@/api/messenger.api";
import DialogList from '@/components/messenger/dialog-list.vue';
import {
  ESocketEvents,
  IAddMessageInDialogDataGet,
  IAddMessageInDialogDataSend,
  IAddMessageInNewDialogDataSend
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
    const onSendMessage = () => {
      // sendMessageToCompanion('login1', 'test');
      sendMessageToDialog('6248481af374be7f91b734d8', 'test');
    }

    const userList = ref<IUserPublic[]>([]);
    const dialogList = ref<IDialog[]>([]);
    const activeDialog = ref<IDialog | undefined>();

    const init = (data: { userList: IUserPublic[], dialogList: ISourceDialog[] }): void => {
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
          isGroup: dialog?.isGroup || false
        }
      })

      socket.on(ESocketEvents.Message, onGetMessage);
      socket.on(ESocketEvents.DialogCreate, onCreateDialog);
    }

    const onSelectDialog = (index: number): void => {
      activeDialog.value = dialogList.value[index];
    }

    const deselectDialog = () => activeDialog.value = undefined;

    //FIXME: реализовать загрузку загрузку сообщений по кускам
    // const isAllMessagesInCurrentDialog = ref(false);

    const loadMessages = async (): Promise<void> => {
      // !isAllMessagesInCurrentDialog.value &&
    }

    const sendMessage = async (messageText: string): Promise<void> => {
      if (activeDialog.value?._id) {
        await sendMessageToDialog(activeDialog.value?._id as string, messageText);
        return;
      }
      await sendMessageToCompanion(activeDialog.value?.login as string, messageText);
    }

    const sendMessageToCompanion = async (companionLogin: string, text: string): Promise<void> => {
      socket.emit(ESocketEvents.AddMessageInNewDialog, {
        companionLogin,
        text
      } as IAddMessageInNewDialogDataSend);
    }

    const sendMessageToDialog = async (dialogId: string, text: string): Promise<void> => {
      socket.emit(ESocketEvents.AddMessageInDialog, {
        dialogId,
        text
      } as IAddMessageInDialogDataSend);
    }

    const onGetMessage = (data: IAddMessageInDialogDataGet): void => {
      dialogList.value.find((dialog) => dialog._id === data.dialogId)?.messageList.push(data.message);
    }

    const onCreateDialog = (data: IDialog): void => {
      if (!data.isGroup) {
        const dialog = dialogList.value.find((dialog) => dialog.participantLoginList.includes(dialog.login) || data.participantLoginList.includes(dialog.login));
        if (dialog) {
          dialog._id = data._id;
          dialog.messageList = data.messageList;
          return;
        }
        dialogList.value.push(data);
        return;
      }
      //FIXME: group logic
    }

    // const getMessages = async (dialogId: string, start: number, end: number): Promise<void> => {
    //   const wrapper: ISocketWrapper<{ start: number, end: number }> = {
    //     queue: getQueue(),
    //     data: {start, end}
    //   }
    //   socket.emit(ESocketEvents.GetMessages, wrapper);
    // }

    socket.on(ESocketEvents.Init, (data: { userList: IUserPublic[], dialogList: ISourceDialog[] }) => {
      init(data);
    })

    onBeforeMount(() => {
      initSocket();
    })

    return {
      dialogList,
      userList,
      activeDialog,
      sendMessage,
      deselectDialog,
      onSendMessage,
      onSelectDialog,
      loadMessages
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
