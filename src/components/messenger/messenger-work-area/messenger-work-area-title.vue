<template>
  <div class="messenger-work-area-title flex row full-width">
    <span class="messenger-work-area-title__name">{{ dialog?.name }}</span>
    <q-space />
    <q-btn
      size="xs"
      round
      @click="closeDialog"
    >
      <q-icon name="clear" />
    </q-btn>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {IDialog} from "@/models/messenger";

export default defineComponent({
  name: 'MessengerWorkAreaTitle',
  props: {
    dialog: {
      type: Object as PropType<IDialog>,
      default: undefined
    }
  },
  emits: ['closeDialog'],
  setup(props, {emit}) {
    const closeDialog = () => emit('closeDialog');

    return {
      closeDialog
    }
  }
})
</script>

<style lang="scss">
.messenger-work-area-title {
  padding: 12px;
  border-bottom: solid 1px #d9d9d9;

  .messenger-work-area-title__name {
    font-weight: bold;
    font-size: 16px;
  }
}
</style>
