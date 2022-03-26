import { createStore } from 'vuex';
import userModule from './user-module';
import { IStore } from '@/models/store';

const store = createStore({
  state: (): IStore => ({
    isDataLoaded: false
  }),
  mutations: {
    setIsDataLoaded(state: IStore) {
      state.isDataLoaded = true;
    }
  },
  getters: {
    isDataLoaded(state: IStore) {
      return state.isDataLoaded;
    }
  },
  modules: {
    userModule
  },
});

export default store;
