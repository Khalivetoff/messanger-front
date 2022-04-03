import { createApp } from 'vue';
import { Quasar, Dialog, Notify, Loading } from 'quasar';
import App from './App.vue';
import router from './router';
import store from './store';
import './styles/quasar.scss';
import '@quasar/extras/material-icons/material-icons.css';
import './styles/default.scss';

const app = createApp(App);
app.use(Quasar, {
  plugins: {
    Dialog,
    Notify,
    Loading
  }
});
app.use(store);
app.use(router);
app.mount('#app');
