<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-carousel cycle hide-delimiters show-arrows-on-hover height="380">
                    <v-carousel-item v-for="(item, i) in posters" :key="i" :src="require(`@/assets/img/${item.poster}`)"/>
                </v-carousel>
            </v-col>
            <v-col cols="12">
                <video-panel v-bind="videoPanel">
                    <template v-slot:tags>
                        <ul class="text-small">
                            <li class="d-block float-left">
                                今日更新 <span class="red--text text--darken-3">{{videoPanel.items.length}}</span> 部
                                共 <span class="red--text text--darken-3">9999876</span> 部
                                <span class="mx-2"/>
                            </li>
                            <li class="d-block float-left">
                                <router-link class="v-link" to="/video/list">更多...</router-link>
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
                            <li class="d-block float-left" v-for="genre in movieGenres" :key="genre.value">
                                <router-link class="v-link" :to="`/video/list?type=movie&genre=${genre.value}`">{{genre.label}}</router-link>
                                <span class="mx-2">/</span>
                            </li>
                            <li class="d-block float-left">
                                <router-link class="v-link" to="/video/list?type=movie">更多...</router-link>
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
                            <li class="d-block float-left" v-for="genre in dramaGenres" :key="genre.value">
                                <router-link class="v-link" :to="`/video/list?type=drama&genre=${genre.value}`">{{genre.label}}</router-link>
                                <span class="mx-2">/</span>
                            </li>
                            <li class="d-block float-left">
                                <router-link class="v-link" to="/video/list?type=drama">更多...</router-link>
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
import axios from 'axios';

/**
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API
 */
export default {
    name: 'Home',
    components: {VideoPanel, VideoCard},
    data: () => ({
        posters: require('@/data/posters.json'),
        videoPanel: {
            title: '最新视频',
            items: require('@/data/videos.json'),
        },
        moviePanel: {
            title: '电影',
            items: require('@/data/videos.json'),
        },
        dramaPanel: {
            title: '连续剧',
            items: require('@/data/videos.json'),
        },
    }),
    computed: {
        movieGenres: {
            set(movieGenres) {
                this.$store.commit('setData', {movieGenres});
            },
            get() {
                return this.$store.state.movieGenres;
            },
        },
        dramaGenres: {
            set(dramaGenres) {
                this.$store.commit('setData', {dramaGenres});
            },
            get() {
                return this.$store.state.dramaGenres;
            },
        },
    },
    mounted() {
        if (!this.movieGenres.length) {
            axios.get('/api/dicts?tag=movie-genre').then(res => {
                this.movieGenres = res.data.map(item => Object.assign(item, {label: item.label + '片'}));
            });
        }
        if (!this.dramaGenres.length) {
            axios.get('/api/dicts?tag=drama-genre').then(res => {
                this.dramaGenres = res.data;
            });
        }
    },
};
</script>
