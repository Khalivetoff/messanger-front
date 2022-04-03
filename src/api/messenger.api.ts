import io from 'socket.io-client';
import {cookies} from "@/utils/cookies.util";
import {ESocketEvents, ISocketWrapper} from "@/models/socket";
import store from "@/store";

let queue = 0;
export const getQueue = (): number => (queue++);

export const socket = io(`ws://localhost:3000`, {
  reconnectionDelayMax: 10000,
  autoConnect: false,
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd"
  }
});

socket.on('connection', () => {
  // socket.on(ESocketEvents.Init, (data: ) => {
  //
  // })
})

export const sendMessageToCompanion = async (companionLogin: string, text: string): Promise<void> => {
  socket.emit(ESocketEvents.AddMessageInNewDialog, {queue: getQueue(), data: {companionLogin, text}} as ISocketWrapper);
}

export const sendMessageToDialog = async (dialogId: string, text: string): Promise<void> => {
  socket.emit(ESocketEvents.AddMessageInDialog, {queue: getQueue(), data: {text, dialogId}} as ISocketWrapper);
}

const initSocket = (): void => {
  socket.auth = {
    token: cookies.getCookie(process.env.VUE_APP_TOKEN_NAME),
    login: store.getters["userModule/userData"]?.login
  }
  socket.connect();
}

export default initSocket;

