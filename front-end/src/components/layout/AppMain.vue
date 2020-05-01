<template>
    <v-content>
        <v-fade-transition mode="out-in">
            <router-view/>
        </v-fade-transition>
    </v-content>
</template>

<script>
import {DICT_TYPES, ACTION_TYPES} from '@/plugins/store-types';

export default {
    name: 'AppMain',
    mounted() {
        this.$store.dispatch(ACTION_TYPES.GET_DICT, [DICT_TYPES.MOVIE_GENRE, DICT_TYPES.DRAMA_GENRE]);
    }
};
</script>

