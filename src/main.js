import { createApp } from 'vue'
import BaseCard from './components/ui/BaseCard.vue';

import App from './App.vue';

const app = createApp(App)

app.component('base-card', BaseCard);
app.mount('#app');
