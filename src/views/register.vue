<template>
  <div class="full-width full-height row flex justify-center items-center login">
    <q-card class="col-xs-12 col-sm-8 col-md-5 col-lg-4 col-xl-3">
      <q-card-section>
        <div>Registration</div>
        <q-form
          greedy
          class="q-gutter-md"
          @submit="authorize"
          @reset="goToRegister"
        >
          <q-input
            v-model="registerData.name"
            label="Name"
            :rules="[e => !!e || '']"
          />
          <q-input
            v-model="registerData.login"
            label="Login"
            :rules="[e => !!e || '']"
          />
          <q-input
            v-model="registerData.password"
            label="Password"
            type="password"
            :rules="[e => !!e || '']"
          />
          <div class="d-flex row justify-between">
            <q-btn
              label="have an account"
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

export default defineComponent({
  name: 'Register',
  setup() {
    const $router = useRouter();
    const registerData = reactive({
      login: '',
      password: '',
      name: ''
    });

    const isLoading = ref(false);

    const authorize = async (): Promise<void> => {
      try {
        isLoading.value = true;
        await registerUser(registerData);
        $router.push({ name: 'Main' });
      } finally {
        isLoading.value = false;
      }
    };

    const goToRegister = (): void => {
      $router.push({ name: 'Login' });
    };

    return {
      registerData,
      isLoading,
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
