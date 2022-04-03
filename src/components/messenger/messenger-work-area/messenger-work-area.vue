<template>
  <div class="messenger-work-area self-stretch">
    <template v-if="dialog">
      <messenger-work-area-title :dialog="dialog" />
      <messages-wrapper :message-list="dialog?.messageList || []" />
    </template>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, PropType} from "vue";
import {IDialog} from "../../../models/messenger";
import MessengerWorkAreaTitle
  from "@/components/messenger/messenger-work-area/messenger-work-area-title.vue";
import MessagesWrapper from "@/components/messenger/messenger-work-area/messages-wrapper.vue";

export default defineComponent({
  name: 'MessengerWorkArea',
  components: {MessagesWrapper, MessengerWorkAreaTitle},
  props: {
    dialog: {
      type: Object as PropType<IDialog>
    }
  },
  setup(props) {
    const title = computed(() => props.dialog?.name);

    return {
      title
    }
  }
})
</script>

<style lang="scss">
.messenger-work-area {
  border-left: solid 1px #d9d9d9;
}
</style>
