import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import 'vuetify/styles'; // Import Vuetify styles
import '@mdi/font/css/materialdesignicons.min.css'; // Import Material Design Icons
import '@fortawesome/fontawesome-free/css/all.css'; // Import FontAwesome

createApp(App).use(vuetify).use(router).mount('#app');
