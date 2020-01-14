<template>
    <v-container>
        <v-row dense no-gutters v-if="video">
            <v-col cols="12" lg="9">
                <video-player :options="playerOpts"></video-player>
                <v-card tile flat dark>
                    <v-card-title>{{video.title}}</v-card-title>
                    <v-card-subtitle class="py-2">
                        {{video.imdbRating}} / {{video.year}} / <label v-for="(item, i) in video.countries" :key="item.k">{{item.v}}<span v-if="i!==video.countries.length-1"> · </span></label> / <label v-for="(item, i) in video.genres" :key="item.k">{{item.v}}<span v-if="i!==video.genres.length-1"> · </span></label> / 2048次播放
                        <a class="v-link" @click="expand=!expand">
                            详情<v-icon small>{{expand?'keyboard_arrow_up':'keyboard_arrow_down'}}</v-icon>
                        </a>
                    </v-card-subtitle>
                    <v-card-text :class="[{'d-none': !expand}]">
                        <p class="my-1">
                            导演：<label v-for="(item, i) in video.directors" :key="item.k">{{item.v}}<span v-if="i!==video.directors.length-1"> / </span></label>
                        </p>
                        <p class="my-1">
                            编剧：<label v-for="(item, i) in video.writers" :key="item.k">{{item.v}}<span v-if="i!==video.writers.length-1"> / </span></label>
                        </p>
                        <p class="my-1">
                            主演：<label v-for="(item, i) in video.actors" :key="item.k">{{item.v}}<span v-if="i!==video.actors.length-1"> / </span></label>
                        </p>
                        <p class="my-1">
                            类型：<label v-for="(item, i) in video.genres" :key="item.k">{{item.v}}<span v-if="i!==video.genres.length-1"> / </span></label>
                        </p>
                        <p class="my-1">年份：{{video.year}}</p>
                        <p class="my-1">简介：{{video.plot}}</p>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" lg="3">
                <v-tabs dark slider-color="orange darken-1">
                    <v-tab>播放列表</v-tab>
                    <v-tab>相关推荐</v-tab>
                    <v-tab-item>
                        <v-card tile flat dark class="v-card-content hide-scrollbar">
                            <v-card-text>
                                <v-btn to="/video/play" color="primary">1080P</v-btn>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card tile flat dark class="v-card-content hide-scrollbar">
                            <v-container>
                                <v-row dense>
                                    <v-col v-for="(video, i) in videos" :key="i" cols="4" md="3" lg="6">
                                        <v-lazy>
                                            <v-card outlined>
                                                <v-hover v-slot:default="{ hover }">
                                                    <v-img :src="require(`@/assets/img/${video.poster}`)" class="align-end text-center">
                                                        <v-expand-transition>
                                                            <div class="d-flex transition-fast-in-fast-out grey darken-3 v-card--reveal"
                                                                 v-if="hover">
                                                                <v-btn icon class="white--text" to="/video/play" target="_blank">
                                                                    <v-icon x-large>play_circle_outline</v-icon>
                                                                </v-btn>
                                                            </div>
                                                        </v-expand-transition>
                                                        <h4 class="font-weight-medium pa-1">{{video.title}}</h4>
                                                    </v-img>
                                                </v-hover>
                                            </v-card>
                                        </v-lazy>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card>
                    </v-tab-item>
                </v-tabs>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
//import Base from '@/components/util/Base';
import VideoPlayer from '@/components/shared/VideoPlayer';
import axios from 'axios';

/**
 * @see https://docs.videojs.com/tutorial-vue.html
 */
export default {
    name: 'VideoPlay',
    components: {VideoPlayer},
    data: () => ({
        video: null,
        playerOpts: {
            controls: true,
            preload: 'auto',
            poster: require('@/assets/poster.png'),
            sources: null
        },
        videos: require('@/data/videos.json'),
        expand: false,
    }),
    mounted() {
        //Base.jsonp('https://api.douban.com/v2/movie/imdb/tt0111161', {
        //    apikey: '0df993c66c0c636e29ecbb5344252a4a'
        //}, (res) => {
        //    console.info(res.rating['average']);
        //});
        axios.get('/api/videos/1').then(res => {
            this.playerOpts.sources = [
                {src: res.data.source},
                {src: res.data.source, type: 'video/webm'},
            ];
            this.video = res.data;
        });
    },
}
</script>