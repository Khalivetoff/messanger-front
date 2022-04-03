<template>
  <q-header
    bordered
    class="bg-white text-primary flex wrap justify-center items-center header"
  >
    <span class="header__user-name">{{ userData?.name }}</span>
    <q-btn
      round
      flat
      class="absolute header__exit-btn"
      @click="exit"
    >
      <q-icon name="logout" />
    </q-btn>
  </q-header>
  <q-page-container class="flex column">
    <messenger />
  </q-page-container>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import Messenger from '@/components/messenger/messenger.vue';
import {useStore} from "vuex";
import {IUserPublic} from "@/models/user";
import {logoutUser} from "@/api/user.api";
import {redirectToLoginPage} from "@/utils/router";
import {socket} from "@/api/messenger.api";
import {ESocketEvents} from "@/models/socket";

export default defineComponent({
  name: 'Main',
  components: {
    Messenger
  },
  setup() {
    const $store = useStore();

    const userData = computed<IUserPublic>(() => $store.getters['userModule/userData']);

    const exit = async (): Promise<void> => {
      await logoutUser();
      socket.emit(ESocketEvents.ForceDisconnect);
      redirectToLoginPage();
    }

    return {
      userData,
      exit
    }
  }
})
</script>

<style lang="scss" scoped>
.header {
  padding: 10px;

  .header__user-name {
    font-size: 18px;
  }

  .header__exit-btn {
    right: 6px;
  }
}

.q-page-container {
  flex-grow: 1;
  flex-shrink: 0;
}
</style>
