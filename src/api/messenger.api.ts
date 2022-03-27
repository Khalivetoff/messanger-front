import io from 'socket.io-client';
import {cookies} from "@/utils/cookies.util";
import {ESocketEvents, IMessage} from "@/models/socket";
import store from "@/store";

export const socket = io(`ws://localhost:3000`, {
  reconnectionDelayMax: 10000,
  autoConnect: false,
  auth: {
    token: cookies.getCookie(process.env.VUE_APP_TOKEN_NAME),
    login: store.getters["userModule/userData"]?.login
  },
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd"
  }
});

socket.on('connection', () => {
  // socket.on(ESocketEvents.GetMessage, (data: ) => {
  //
  // })
})

export const sendMessage = async (recipientLogin: string, text: string): Promise<void> => {
  const data: IMessage = {
    text,
    recipientLogin
  }
  socket.emit(ESocketEvents.GetMessage, data);
}

const initSocket = (): void => {
  socket.auth = {
    token: cookies.getCookie(process.env.VUE_APP_TOKEN_NAME),
    login: store.getters["userModule/userData"]?.login
  }
  socket.connect();
}

export default initSocket;

