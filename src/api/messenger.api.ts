import io from 'socket.io-client';
import {cookies} from "@/utils/cookies.util";
import store from "@/store";

export const socket = io(`ws://localhost:3000`, {
  reconnectionDelayMax: 10000,
  autoConnect: false,
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd"
  }
});

const initSocket = (): void => {
  socket.auth = {
    token: cookies.getCookie(process.env.VUE_APP_TOKEN_NAME),
    login: store.getters["userModule/userData"]?.login
  }
  socket.connect();
}

export default initSocket;

