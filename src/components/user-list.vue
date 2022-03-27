<template>
  <div class="user-list">
    {{ userList }}
  </div>
</template>

<script lang="ts">
import {defineComponent, onBeforeMount, ref} from "vue";
import {IUserPublic} from "@/models/user";
import {getUserList} from "@/api/user.api";

export default defineComponent({
  name: 'UserList',
  setup() {
    const userList = ref<IUserPublic[]>([]);

    onBeforeMount(async () => {
      userList.value = await getUserList();
    })

    return {
      userList
    }
  }
})
</script>
