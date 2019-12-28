<template>
    <!-- Mobile Side Menu -->
    <v-navigation-drawer app temporary v-model="drawer">
        <v-list>
            <v-list-item v-for="(menu, i) in menus" :key="i" :to="menu.url" link>
                <v-list-item-content>
                    <v-list-item-title>{{ menu.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
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
                this.$store.commit('setDrawer', {drawer});
            }
        }
    }
};
</script>

