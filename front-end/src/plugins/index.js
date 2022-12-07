import store from './store';
import router from './router';
import vuetify from './vuetify';

export function registerPlugins(app) {
    app.use(store)
    app.use(router)
    app.use(vuetify)
}
