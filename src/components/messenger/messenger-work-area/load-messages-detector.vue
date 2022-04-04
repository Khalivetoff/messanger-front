<template>
  <div
    ref="loadMessagesDetector"
    class="load-messages-detector"
  />
</template>

<script lang="ts">
import {defineComponent, onBeforeUnmount, onMounted, shallowRef} from "vue";
import observer from "@/utils/observer.util";

export default defineComponent({
  name: 'LoadMessagesDetector',
  emits: ['onTrigger'],
  setup(props, {emit}) {
    const loadMessagesDetector = shallowRef<Element>();

    const onObserveTrigger = (): void => {
      emit('onTrigger');
    }

    onMounted(() => {
      observer.addTarget(loadMessagesDetector.value as Element, onObserveTrigger, undefined, false);
    })

    onBeforeUnmount(() => {
      observer.deleteTarget(loadMessagesDetector.value as Element);
    })

    return {
      loadMessagesDetector
    }
  }
})
</script>
