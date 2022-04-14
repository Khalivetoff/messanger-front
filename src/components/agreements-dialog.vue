<template>
  <q-dialog ref="dialogRef">
    <q-card class="agreements-dialog">
      <q-card-section class="row">
        <h5 class="no-margin">
          Соглашение)
        </h5>
      </q-card-section>
      <q-card-section v-html="agreements" />
      <q-card-section>
        <div class="row">
          <q-space />
          <q-btn
            color="primary"
            @click="onDialogCancel"
          >
            Ладно
          </q-btn>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import {defineComponent, onBeforeMount, ref} from "vue";
import {useDialogPluginComponent} from "quasar";
import {getAgreements} from "@/api/agreements.api";

export default defineComponent({
  name: 'AgreementsDialog',
  setup() {
    const { dialogRef, onDialogCancel } = useDialogPluginComponent();

    const agreements = ref<string>('');

    onBeforeMount(async () => {
      agreements.value = await getAgreements();
    })

    return {
      agreements,
      dialogRef,
      onDialogCancel
    }
  }
})
</script>

<style lang="scss">
.agreements-dialog {
  width: 500px;
}
</style>
