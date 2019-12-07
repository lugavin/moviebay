import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

/**
 * @see https://vuex.vuejs.org/zh/guide/
 */
export default new Vuex.Store({
    state: {
        drawer: false, // Hide mobile side menu by default
    },
    mutations: {
        setDrawer: (state, payload) => (state.drawer = payload.drawer),
        toggleDrawer: state => (state.drawer = !state.drawer)
    }
});