<template>
  <messenger/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Messenger from '@/components/messenger.vue';

export default defineComponent({
  name: 'Main',
  components: {
    Messenger
  }
})
</script>
