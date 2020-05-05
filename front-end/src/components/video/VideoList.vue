<template>
    <v-container>
        <v-row dense>
            <v-col cols="12">
                <v-card outlined>
                    <v-toolbar dense flat class="grey lighten-3">
                        <h4 class="font-weight-medium">共检索到 <span class="red--text text--darken-3">{{rows}}</span> 条结果</h4>
                        <v-spacer/>
                        <a class="v-link text-small" @click="expand=!expand">
                            筛选<v-icon small>{{expand?'keyboard_arrow_up':'keyboard_arrow_down'}}</v-icon>
                        </a>
                    </v-toolbar>
                    <v-card-text :class="[{'d-none': !expand}, 'py-2']">
                        <v-chip-group v-model="filter.genres" column color="indigo">
                            <v-chip v-for="(v, k) in genres" :key="k" :value="k" label outlined filter>{{v}}</v-chip>
                        </v-chip-group>
                        <v-chip-group v-model="filter.sorts" column color="indigo">
                            <v-chip v-for="{value, label} in sorts" :key="value" :value="value" label outlined filter>
                                {{label}}
                            </v-chip>
                        </v-chip-group>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12">
                <v-row dense>
                    <v-col v-for="(video, i) in videos" :key="i" cols="4" md="3" lg="2" class="py-2">
                        <video-card v-bind="video"/>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12">
                <v-pagination v-model="page" :length="rows" :total-visible="7"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import {mapState} from 'vuex';
import {DICT_TYPES} from '@/plugins/store-types';
import VideoCard from '@/components/shared/VideoCard';

export default {
    name: 'VideoList',
    components: {VideoCard},
    props: ['type'],
    data: () => ({
        page: 1,
        rows: 15,
        filter: {
            genres: [],
            sorts: []
        },
        sorts: [
            {value: 1, label: '按时间排序'},
            {value: 2, label: '按人气排序'},
            {value: 3, label: '按评分排序'}
        ],
        expand: false,
        videos: require('@/data/videos.json')
    }),
    computed: {
        ...mapState({
            genres(state) {
                switch (this.type) {
                    case 'movie':
                        return state[DICT_TYPES.MOVIE_GENRE];
                    case 'drama':
                        return state[DICT_TYPES.DRAMA_GENRE];
                    default:
                        return [];
                }
            }
        })
    }
};
</script>
