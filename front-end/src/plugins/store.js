import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import {API} from '@/components/util/consts';
import {DICT_TYPES, ACTION_TYPES, MUTATION_TYPES} from './store-types';

Vue.use(Vuex);

/**
 * @see https://vuex.vuejs.org/zh/guide/
 */
export default new Vuex.Store({
    state: {
        drawer: false, // Hide mobile side menu by default,
        [DICT_TYPES.MOVIE_GENRE]: {},
        [DICT_TYPES.SERIES_GENRE]: {}
    },
    mutations: {
        [MUTATION_TYPES.SET_STATE]: (state, payload) => Object.assign(state, payload),
        [MUTATION_TYPES.TOGGLE_DRAWER]: state => (state.drawer = !state.drawer)
    },
    actions: {
        [ACTION_TYPES.GET_DICT]: ({commit}, tags) => {
            return axios.get(API.dicts, {
                params: {tags},
                paramsSerializer: params => params.tags.map(tag => `tags=${tag}`).join('&')
            }).then(res => {
                const payload = res.data.reduce((pre, curr) => {
                    pre[curr.tag] = pre[curr.tag] || {};
                    pre[curr.tag][curr.value] = curr.label;
                    return pre;
                }, {});
                commit(MUTATION_TYPES.SET_STATE, payload);
                return payload;
            });
        }
    }
});