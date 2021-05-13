<template>
    <v-main>
        <v-fade-transition mode="out-in">
            <router-view/>
        </v-fade-transition>
    </v-main>
</template>

<script>
import {ACTION_TYPES, DICT_TYPES} from '@/plugins/store-types';

export default {
    name: 'AppMain',
    mounted() {
        this.$store.dispatch(ACTION_TYPES.GET_DICT, Object.values(DICT_TYPES));
    }
};
</script>

