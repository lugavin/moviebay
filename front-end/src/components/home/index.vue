<template>
    <v-container>
        <v-row>
            <!--
            <v-col cols="12">
                <v-carousel cycle hide-delimiters show-arrows-on-hover height="380">
                    <v-carousel-item v-for="(item, i) in posters" :key="i" :src="require(`@/assets/img/${item.poster}`)"/>
                </v-carousel>
            </v-col>
            -->
            <v-col cols="12">
                <video-panel v-bind="videoPanel">
                    <template v-slot:tags>
                        <ul class="text-small">
                            <li class="d-block float-left">
                                今日更新 <span class="red--text text--darken-3">12</span> 部
                                共 <span class="red--text text--darken-3">9999876</span> 部
                                <span class="mx-2"/>
                            </li>
                            <li class="d-block float-left">
                                <router-link class="v-link" to="/videos">更多...</router-link>
                            </li>
                        </ul>
                    </template>
                    <template v-slot:default>
                        <v-container>
                            <v-row dense>
                                <v-col v-for="(item, i) in videoPanel.items" :key="i" cols="4" md="3" lg="2">
                                    <video-card v-bind="item"/>
                                </v-col>
                            </v-row>
                        </v-container>
                    </template>
                </video-panel>
            </v-col>
            <v-col cols="12">
                <video-panel v-bind="moviePanel">
                    <template v-slot:tags>
                        <ul class="text-small">
                            <li class="d-block float-left" v-for="(v, k) in movieGenres" :key="k">
                                <router-link class="v-link" :to="`/movies?genre=${k}`">{{v}}</router-link>
                                <span class="mx-2">/</span>
                            </li>
                            <li class="d-block float-left">
                                <router-link class="v-link" to="/movies">更多...</router-link>
                            </li>
                        </ul>
                    </template>
                    <template v-slot:default>
                        <v-container>
                            <v-row dense>
                                <v-col v-for="(item, i) in moviePanel.items" :key="i" cols="4" md="3" lg="2">
                                    <video-card v-bind="item"/>
                                </v-col>
                            </v-row>
                        </v-container>
                    </template>
                </video-panel>
            </v-col>
            <v-col cols="12">
                <video-panel v-bind="dramaPanel">
                    <template v-slot:tags>
                        <ul class="text-small">
                            <li class="d-block float-left" v-for="(v, k) in dramaGenres" :key="k">
                                <router-link class="v-link" :to="`/dramas?genre=${k}`">{{v}}</router-link>
                                <span class="mx-2">/</span>
                            </li>
                            <li class="d-block float-left">
                                <router-link class="v-link" to="/dramas">更多...</router-link>
                            </li>
                        </ul>
                    </template>
                    <template v-slot:default>
                        <v-container>
                            <v-row dense>
                                <v-col v-for="(item, i) in dramaPanel.items" :key="i" cols="4" md="3" lg="2">
                                    <video-card v-bind="item"/>
                                </v-col>
                            </v-row>
                        </v-container>
                    </template>
                </video-panel>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import VideoPanel from '@/components/shared/VideoPanel';
import VideoCard from '@/components/shared/VideoCard';
import {DICT_TYPES} from '@/plugins/store-types';
import {Formatter} from '@/components/util/consts';
import {mapState} from 'vuex';
import axios from 'axios';
import * as dayjs from 'dayjs';

/**
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API
 */
export default {
    name: 'Home',
    components: {VideoPanel, VideoCard},
    data: () => ({
        posters: [],
        videoPanel: {
            title: '最新视频',
            items: []
        },
        moviePanel: {
            title: '电影',
            items: []
        },
        dramaPanel: {
            title: '连续剧',
            items: []
        }
    }),
    computed: {
        ...mapState({
            movieGenres: state => state[DICT_TYPES.MOVIE_GENRE],
            dramaGenres: state => state[DICT_TYPES.DRAMA_GENRE]
        })
    },
    mounted() {
        const params = {
            page: 1,
            pageSize: 12
        };
        const dataMapper = items => items.map(item => ({
            vid: item.id,
            poster: item.poster,
            posterThumb: item.posterThumb,
            title: item.title,
            subtitle: dayjs(item.createdAt).format(Formatter.DATE)
        }));
        axios.get('/api/videos', {params}).then(res => {
            this.videoPanel.items = dataMapper(res.data.items);
        });
        axios.get('/api/videos', {params: {...params, type: 'movie'}}).then(res => {
            this.moviePanel.items = dataMapper(res.data.items);
        });
        axios.get('/api/videos', {params: {...params, type: 'drama'}}).then(res => {
            this.dramaPanel.items = dataMapper(res.data.items);
        });
    }
};
</script>
