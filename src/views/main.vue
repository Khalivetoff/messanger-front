<template>
  <div class="main-wrapper flex column no-wrap overflow-hidden">
    <div class="main flex column no-wrap overflow-hidden shadow-2">
      <div class="bg-white relative-position text-primary flex wrap justify-center items-center header">
        <span class="header__user-name">{{ userData?.name }}</span>
        <q-btn
          round
          flat
          class="absolute header__exit-btn"
          @click="exit"
        >
          <q-icon name="logout" />
        </q-btn>
      </div>
      <messenger />
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import Messenger from '@/components/messenger/messenger.vue';
import {useStore} from "vuex";
import {IUserPublic} from "@/models/user";
import {logoutUser} from "@/api/user.api";
import {redirectToLoginPage} from "@/utils/router.util";
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
.main-wrapper {
  flex: 1;
  background-color: #f7f7f7;

  .main {
    flex: 1;
    width: 969px;
    max-width: 100vw;
    margin: 0px auto;
    background-color: #ffffff;

    .header {
      padding: 10px;
      flex: 0;
      border-bottom: solid 1px #d9d9d9;

      .header__user-name {
        font-size: 18px;
      }

      .header__exit-btn {
        right: 6px;
      }
    }

    .messenger {
      flex: 1
    }
  }
}
</style>
