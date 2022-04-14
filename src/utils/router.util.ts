import router from '@/router';
import store from '@/store';

export const redirectToLoginPage = (): void => {
  if (!store.getters.isDataLoaded) {
    return
  }
  store.commit('userModule/clearUserData');
  router.push({ name: 'Login' });
};
