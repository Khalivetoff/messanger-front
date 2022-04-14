<template>
  <div
    v-show="!isDisabled"
    ref="loadMessageListDetector"
    class="load-messages-detector"
  />
</template>

<script lang="ts">
import {defineComponent, onBeforeUnmount, onMounted, PropType, shallowRef} from "vue";
import observer from "@/utils/observer.util";

export default defineComponent({
  name: 'LoadMessageListDetector',
  props: {
    isDisabled: {type: Boolean as PropType<boolean>, default: false}
  },
  emits: ['onTrigger'],
  setup(props, {emit}) {
    const loadMessageListDetector = shallowRef<Element>();

    const onObserveTrigger = (): void => {
      emit('onTrigger');
    }

    onMounted(() => {
      observer.addTarget(loadMessageListDetector.value as Element, onObserveTrigger, undefined, false);
    })

    onBeforeUnmount(() => {
      observer.deleteTarget(loadMessageListDetector.value as Element);
    })

    return {
      loadMessageListDetector
    }
  }
})
</script>
