import { createApp } from 'vue';
import { Quasar } from 'quasar';
import App from './App.vue';
import router from './router';
import store from './store';
import './styles/quasar.scss';
import '@quasar/extras/material-icons/material-icons.css';

createApp(App).use(Quasar).use(Quasar).use(store)
  .use(router)
  .mount('#app');
