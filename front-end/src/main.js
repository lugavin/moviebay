import {createApp} from 'vue'
import App from '@/App.vue'
import store from "@/plugins/store";
import router from "@/plugins/router";
import vuetify from "@/plugins/vuetify";

createApp(App)
    .use(store)
    .use(router)
    .use(vuetify)
    .mount('#app')
