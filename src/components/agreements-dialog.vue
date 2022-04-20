<template>
  <q-dialog ref="dialogRef">
    <q-card class="agreements-dialog">
      <q-card-section class="row">
        <h5 class="no-margin">
          Соглашение)
        </h5>
      </q-card-section>
      <q-card-section>
        <div ref="agreementsWrapperRef" />
      </q-card-section>
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
import {defineComponent, onMounted, shallowRef} from "vue";
import {useDialogPluginComponent} from "quasar";
import {getAgreements} from "@/api/agreements.api";
import errorNotify from "@/utils/notificator.util";

export default defineComponent({
  name: 'AgreementsDialog',
  setup() {
    const agreementsWrapperRef = shallowRef<HTMLElement>();
    const {dialogRef, onDialogCancel} = useDialogPluginComponent();

    onMounted(async () => {
      try {
        (agreementsWrapperRef.value as HTMLElement).innerHTML = await getAgreements();
      } catch (e) {
        errorNotify(e);
      }
    })

    return {
      agreementsWrapperRef,
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
