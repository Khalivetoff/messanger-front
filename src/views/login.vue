<template>
  <div class="full-width full-height row flex justify-center items-center login">
    <q-card class="col-xs-12 col-sm-8 col-md-5 col-lg-4 col-xl-3">
      <q-card-section>
        <div>Authorization</div>
        <q-form
          greedy
          class="q-gutter-md"
          @submit="authorize"
          @reset="goToRegister"
        >
          <q-input
            v-model="authData.login"
            label="Login"
            :rules="[e => !!e || '']"
          />
          <q-input
            v-model="authData.password"
            label="Password"
            type="password"
            :rules="[e => !!e || '']"
          />
          <div class="d-flex row justify-between">
            <q-btn
              label="create account"
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
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Login',
  setup() {
    const $q = useQuasar();
    const $router = useRouter();
    const authData = reactive({
      login: '',
      password: ''
    })

    const isLoading = ref(false);

    const authorize = async (): Promise<void> => {
      try {
        isLoading.value = true;
        await loginUser(authData.login, authData.password);
        $router.push({ name: 'Main' });
      } catch (e) {
        $q.notify({
          type: 'negative',
          message: 'Incorrect login or password'
        })
      } finally {
        isLoading.value = false;
      }
    }

    const goToRegister = (): void => {
      $router.push({name: 'Register'});
    }

    return {
      authData,
      isLoading,
      goToRegister,
      authorize
    }
  }
})
</script>

<style lang="scss">
.login {
  height: 100vh!important;
}
</style>
