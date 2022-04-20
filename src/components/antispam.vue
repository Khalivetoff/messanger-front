<template>
  <q-input
    ref="inputRef"
    v-model="enterCode"
    outlined
    :rules="[() => isValid]"
    stack-label
    placeholder="Введите код"
    class="antispam__input"
    @mousedown.stop
  >
    <template #before>
      <div class="antispam__info column">
        <span class="antispam__info-title">Код</span>
        <span
          class="non-selectable text-weight-bolder mdi-size-xxxl"
          @mousedown.prevent
        >{{ code }}</span>
      </div>
    </template>
  </q-input>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeMount,
  PropType,
  ref,
  shallowRef
} from "vue";
import {QInput} from "quasar";

export default defineComponent({
  name: 'Antispam',
  props: {
    numbersCount: {type: Number as PropType<number>, default: 4}
  },
  setup(props) {
    const code = ref<string>('');
    const enterCode = ref<string>('');
    const inputRef = shallowRef<QInput>();

    const isValid = computed<boolean>(() => code.value === enterCode.value);

    const generateCode = (): void => {
      code.value = String(Math.floor(Math.pow(10, props.numbersCount - 1) + Math.random() * (Math.pow(10, props.numbersCount) - Math.pow(10, props.numbersCount - 1) - 1)));
    }

    const resetEnterCode = (): void => {
      enterCode.value = '';
    }

    const onMousedown = (): void => {
      inputRef.value?.focus();
    }

    const update = (): void => {
      resetEnterCode();
      generateCode();
    }

    onBeforeMount(() => {
      generateCode();
    })

    return {
      isValid,
      code,
      enterCode,
      inputRef,
      update,
      onMousedown
    }
  }
})
</script>

<style lang="scss">
.antispam__info {
  line-height: 1.2;

  .antispam__info-title {
    font-size: 14px;
  }
}
</style>
