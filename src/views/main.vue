<template>
  <div>
    <q-btn
      @click="onClick"
    >
      test
    </q-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import client from '@/api/client';

export default defineComponent({
  name: 'Main',
  setup() {
    const onClick = async (): Promise<void> => {
      (await client.get('/test/test')).data
    }

    return {
      onClick
    }
  }
})
</script>
