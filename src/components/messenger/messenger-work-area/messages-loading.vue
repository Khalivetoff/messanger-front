<template>
  <q-linear-progress
    v-show="isLoading"
    indeterminate
    class="messages-loading absolute flex justify-center items-center"
  />
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";

export default defineComponent({
  name: 'MessagesLoading',
  props: {
    isLoading: {type: Boolean as PropType<boolean>, default: false}
  }
})
</script>

<style lang="scss">
.messages-loading {
  height: 2px;
  top: 0px;
  left: 0px;
  right: 0px;
}
</style>
