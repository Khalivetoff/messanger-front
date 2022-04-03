<template>
  <div class="messenger-work-area-title full-width">
    <span class="messenger-work-area-title__name">{{ dialog?.name }}</span>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {IDialog} from "@/models/messenger";

export default defineComponent({
  name: 'MessengerWorkAreaTitle',
  props: {
    dialog: {
      type: Object as PropType<IDialog>
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
