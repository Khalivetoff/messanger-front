import io from 'socket.io-client';
import {cookies} from "@/utils/cookies.util";
import store from "@/store";

export const socket = io(`ws://${process.env.VUE_APP_SOCKET_ADDRESS}`, {
  reconnectionDelayMax: 10000,
  autoConnect: false,
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd"
  }
});

export const initSocket = (): void => {
  socket.auth = {
    token: cookies.getCookie(process.env.VUE_APP_TOKEN_NAME),
    login: store.getters["userModule/userData"]?.login
  }
  socket.connect();
}

export const killSocket = (): void => {
  socket.disconnect();
}
