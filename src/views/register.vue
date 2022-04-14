<template>
  <div class="full-width full-height row flex justify-center items-center login">
    <q-card class="col-xs-12 col-sm-8 col-md-5 col-lg-4 col-xl-3">
      <q-card-section>
        <h4 class="no-margin">
          Регистрация
        </h4>
        <q-form
          greedy
          class="q-gutter-md"
          @submit="authorize"
          @reset="goToRegister"
        >
          <q-input
            v-model="registerData.name"
            label="Имя"
            :rules="nameRules"
          />
          <q-input
            v-model="registerData.login"
            label="Логин"
            :rules="loginRules"
          />
          <q-input
            v-model="registerData.password"
            label="Пароль"
            type="password"
            :rules="passwordRules"
          />
          <q-checkbox v-model="isAgreementsAccepted">
            Принимаю <span
              class="text-primary"
              @click.stop="openAgreementsDialog"
            >соглашение</span>
          </q-checkbox>
          <div class="d-flex row justify-between">
            <q-btn
              label="авторизоваться"
              type="reset"
              size="small"
              color="primary"
              flat
              class="q-ml-sm"
            />
            <q-btn
              label="register"
              type="submit"
              :loading="isLoading"
              :disable="!isAgreementsAccepted"
              color="primary"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { registerUser } from '@/api/user.api';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import {useQuasar} from "quasar";
import AgreementsDialog from '@/components/agreements-dialog.vue';
import {LOGIN_RULES, NAME_RULES, PASSWORD_RULES} from "@/constants/auth.const";

export default defineComponent({
  name: 'Register',
  setup() {
    const $router = useRouter();
    const $store = useStore();
    const $quasar = useQuasar();

    const registerData = reactive({
      login: '',
      password: '',
      name: ''
    });

    const isAgreementsAccepted = ref(false);

    const isLoading = ref(false);

    const authorize = async (): Promise<void> => {
      try {
        isLoading.value = true;
        $store.commit('userModule/setUserData', await registerUser(registerData));
        await $router.push({ name: 'Main' });
      } finally {
        isLoading.value = false;
      }
    };

    const goToRegister = (): void => {
      $router.push({ name: 'Login' });
    };

    const openAgreementsDialog = (): void => {
      $quasar.dialog({
        component: AgreementsDialog
      })
    }

    return {
      registerData,
      isLoading,
      isAgreementsAccepted,
      loginRules: LOGIN_RULES,
      passwordRules: PASSWORD_RULES,
      nameRules: NAME_RULES,
      openAgreementsDialog,
      goToRegister,
      authorize
    };
  }
});
</script>

<style lang="scss">
.login {
  height: 100vh !important;
}
</style>
