import { createApp } from 'vue';
import { Quasar, Dialog, Notify } from 'quasar';
import App from './App.vue';
import router from './router';
import store from './store';
import './styles/quasar.scss';
import '@quasar/extras/material-icons/material-icons.css';

const app = createApp(App);
app.use(Quasar, {
  plugins: {
    Dialog,
    Notify
  }
});
app.use(store);
app.use(router);
app.mount('#app');
