import { Notify } from 'quasar'

const errorNotify = (message: string): void => {
  Notify.create({
    type: 'negative',
    message: message,
    timeout: 2000
  });
}

export default errorNotify;
