import Vue from 'vue'
import App from './App'
import {store, router, vuetify} from './plugins';

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
    store,
    router,
    vuetify
}).$mount('#app');