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
                    <ul class="text-small">
                        <li class="d-block float-left">
                            今日更新 <span class="red--text text--darken-3">{{videoPanel.items.length}}</span> 部
                            共 <span class="red--text text--darken-3">9999876</span> 部
                            <span class="mx-2"/>
                        </li>
                        <li class="d-block float-left">
                            <router-link class="v-link" :to="videoPanel.url">更多...</router-link>
                        </li>
                    </ul>
                </video-panel>
            </v-col>
            <v-col cols="12">
                <video-panel v-bind="moviePanel">
                    <ul class="text-small">
                        <li class="d-block float-left" v-for="genre in movieGenres" :key="genre.value">
                            <router-link class="v-link" to="/">{{genre.label+'片'}}</router-link>
                            <span class="mx-2">/</span>
                        </li>
                        <li class="d-block float-left">
                            <router-link class="v-link" :to="moviePanel.url">更多...</router-link>
                        </li>
                    </ul>
                </video-panel>
            </v-col>
            <v-col cols="12">
                <video-panel v-bind="tvPanel">
                    <ul class="text-small">
                        <li class="d-block float-left" v-for="genre in dramaGenres" :key="genre.value">
                            <router-link class="v-link" to="/">{{genre.label}}</router-link>
                            <span class="mx-2">/</span>
                        </li>
                        <li class="d-block float-left">
                            <router-link class="v-link" :to="tvPanel.url">更多...</router-link>
                        </li>
                    </ul>
                </video-panel>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import VideoPanel from '@/components/shared/VideoPanel';
import axios from 'axios';

/**
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API
 */
export default {
    name: 'Home',
    components: {VideoPanel},
    data: () => ({
        posters: require('@/data/posters.json'),
        videoPanel: {
            title: '最新视频',
            url: '/video/list',
            items: require('@/data/videos.json'),
        },
        moviePanel: {
            title: '电影',
            url: '/video/list',
            items: require('@/data/videos.json'),
        },
        tvPanel: {
            title: '连续剧',
            url: '/video/list',
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
        axios.get('/api/dicts?tag=MovieGenre').then(res => {
            this.movieGenres = res.data;
        });
        axios.get('/api/dicts?tag=DramaGenre').then(res => {
            this.dramaGenres = res.data;
        });
    },
};
</script>
