import { IUserPublic } from '@/models/user';
import { IUserModule } from '@/models/store/user-module';

export default {
  namespaced: true,
  state: (): IUserModule => ({
    userData: undefined
  }),
  mutations: {
    setUserData(state: IUserModule, payload: IUserPublic): void {
      state.userData = payload;
    },
    clearUserData(state: IUserModule): void {
      state.userData = undefined;
    }
  },
  getters: {
    userData(state: IUserModule): IUserPublic | undefined {
      return state.userData;
    }
  }
}
