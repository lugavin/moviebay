import Vue from 'vue'
import App from './App'
import Plugins from './plugins';

Vue.config.productionTip = false;

// For client addOns
//window.Vue = Vue;

new Vue({
    ...App,
    ...Plugins
}).$mount('#app');
