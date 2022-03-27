<template>
  <div class="messenger">
    <user-list />
    <q-btn @click="onSendMessage">
      send message
    </q-btn>
  </div>
</template>

<script lang="ts">
import {defineComponent, onBeforeMount} from 'vue';
import initSocket, {sendMessage} from "@/api/messenger.api";
import UserList from '@/components/user-list.vue';

export default defineComponent({
  name: 'Messenger',
  components: {
    UserList
  },
  setup() {
    const onSendMessage = () => {
      sendMessage('login2', 'test');
    }

    onBeforeMount(() => {
      initSocket();
    })

    return {
      onSendMessage
    }
  }
})
</script>
