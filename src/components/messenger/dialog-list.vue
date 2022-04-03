<template>
  <div class="dialog-list flex column">
    <dialog-list-item
      v-for="(dialog, index) in dialogList"
      :key="index"
      v-ripple
      :data="dialog"
      class="relative-position"
      :class="{'dialog-list-item--active': isActiveDialog(dialog)}"
      @click="selectDialog(index)"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {IDialog} from "@/models/messenger";
import DialogListItem from "@/components/messenger/dialog-list-item.vue";

export default defineComponent({
  name: 'DialogList',
  components: {DialogListItem},
  props: {
    dialogList: {
      type: Array as PropType<IDialog[]>,
      default: () => ([])
    },
    activeDialog: {
      type: Object as PropType<IDialog>
    }
  },
  emits: ['onSelectDialog'],
  setup(props, {emit}) {
    const selectDialog = (index: number) => emit('onSelectDialog', index);

    const isActiveDialog = ({_id, login}: IDialog): boolean => {
      return !!props.activeDialog && (_id === props.activeDialog?._id || login === props.activeDialog?.login)
    }

    return {
      isActiveDialog,
      selectDialog
    }
  }
})
</script>

<style lang="scss">
.dialog-list {
  border-bottom: solid 1px #d9d9d9;

  &-item:not(:last-child) {
    border-bottom: solid 1px #d9d9d9;
  }
}
</style>
