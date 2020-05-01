<template>
    <!-- Mobile Side Menu -->
    <v-navigation-drawer app temporary v-model="drawer">
        <v-list>
            <v-list-item link v-for="(menu, i) in menus" :key="i" :to="menu.url">
                <v-list-item-content>
                    <v-list-item-title>{{ menu.name }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import { MUTATION_TYPES } from '@/plugins/store-types';

export default {
    name: 'AppDrawer',
    data: () => ({
        menus: require('@/data/menus.json')
    }),
    computed: {
        drawer: {
            get() {
                return this.$store.state.drawer;
            },
            set(drawer) {
                this.$store.commit(MUTATION_TYPES.SET_DATA, { drawer });
            }
        }
    }
};
</script>

