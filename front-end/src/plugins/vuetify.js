import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

/**
 * @see https://vuetifyjs.com/zh-Hans/getting-started/pre-made-layouts
 * @see https://v15.vuetifyjs.com/zh-Hans/framework/grid
 * @see https://vuetifyjs.com/zh-Hans/components/grids
 */
export default new Vuetify({
    icons: {
        iconfont: 'md', // fa|md|mdi(default)
    },
});