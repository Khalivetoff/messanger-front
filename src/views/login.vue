<template>
  <div class="full-width full-height row flex justify-center items-center login">
    <q-card class="col-xs-12 col-sm-8 col-md-5 col-lg-4 col-xl-3">
      <q-card-section>
        <h4 class="no-margin">
          Авторизация
        </h4>
        <q-form
          greedy
          class="q-gutter-md"
          @submit="authorize"
          @reset="goToRegister"
        >
          <q-input
            v-model="authData.login"
            label="Логин"
            :rules="loginRules"
          />
          <q-input
            v-model="authData.password"
            label="Пароль"
            type="password"
            :rules="passwordRules"
          />
          <div class="d-flex row justify-between">
            <q-btn
              label="создать аккаунт"
              type="reset"
              size="small"
              color="primary"
              flat
              class="q-ml-sm"
            />
            <q-btn
              label="Login"
              type="submit"
              :loading="isLoading"
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
import { loginUser } from '@/api/user.api';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import {LOGIN_RULES, PASSWORD_RULES} from "@/constants/auth.const";

export default defineComponent({
  name: 'Login',
  setup() {
    const $router = useRouter();
    const $store = useStore();

    const authData = reactive({
      login: '',
      password: ''
    });

    const isLoading = ref(false);

    const authorize = async (): Promise<void> => {
      try {
        isLoading.value = true;
        $store.commit('userModule/setUserData', await loginUser(authData.login, authData.password));
        await $router.push({ name: 'Main' });
      } finally {
        isLoading.value = false;
      }
    };

    const goToRegister = (): void => {
      $router.push({ name: 'Register' });
    };

    return {
      authData,
      isLoading,
      loginRules: LOGIN_RULES,
      passwordRules: PASSWORD_RULES,
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
