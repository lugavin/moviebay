<template>
    <v-container>
        <v-row dense no-gutters>
            <v-col cols="9">
                <video id="vjs-player" class="video-js vjs-fluid vjs-big-play-left-bottom"
                       controls preload="auto" :poster="video.poster">
                    <source :src="video.url" type="video/mp4"/>
                    <source :src="video.url" type="video/webm"/>
                    <p class="vjs-no-js">
                        To view this video please enable JavaScript, and consider upgrading to a web browser that
                        <a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
                    </p>
                </video>
                <v-container fluid class="grey darken-3 font-weight-medium">
                    <ul class="pl-0 white--text">
                        <li class="d-block py-1 title">少年的你</li>
                        <li class="d-block py-1 subtitle-1">8.4 / 2019 / 大陆 / 剧情 / 2048次播放 / 详情</li>
                    </ul>
                    <ul class="pl-0 grey--text">
                        <li class="d-block py-1">导演：曾国祥</li>
                        <li class="d-block py-1">主演：周冬雨 / 易烊千玺</li>
                        <li class="d-block py-1">类型：剧情 / 爱情 / 犯罪</li>
                        <li class="d-block py-1">简介：易烊千玺饰演的...</li>
                    </ul>
                </v-container>
            </v-col>
            <v-col cols="3">
                <v-tabs dark slider-color="orange darken-1">
                    <v-tab>播放列表</v-tab>
                    <v-tab>相关推荐</v-tab>
                    <v-tab-item class="grey darken-3">
                        <v-container>
                            <v-row dense>
                                <v-col cols="12">
                                    <v-btn>1080P</v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-tab-item>
                    <v-tab-item class="grey darken-3">
                        <v-container>
                            <v-row dense>
                                <v-col v-for="(video, i) in videos" :key="i" cols="6">
                                    <v-hover v-slot:default="{ hover }">
                                        <v-img :src="require(`@/assets/img/${video.poster}`)" max-width="360" max-height="480">
                                            <v-expand-transition>
                                                <div class="d-flex transition-fast-in-fast-out grey darken-3 v-card--reveal"
                                                     v-if="hover">
                                                    <v-btn icon class="white--text" to="/video/play" target="_blank">
                                                        <v-icon x-large>play_circle_outline</v-icon>
                                                    </v-btn>
                                                </div>
                                            </v-expand-transition>
                                        </v-img>
                                    </v-hover>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-tab-item>
                </v-tabs>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import videojs from 'video.js';

/**
 * @see https://docs.videojs.com/tutorial-vue.html
 */
export default {
    name: 'VideoPlay',
    data: () => ({
        video: {
            id: '1001',
            poster: require('@/assets/poster.png'),
            url: require('@/data/001.mp4'),
        },
        videos: require('@/data/videos.json'),
    }),
    mounted() {
        videojs('vjs-player');
    },
};
</script>

<style>
@import "~video.js/dist/video-js.min.css";

.vjs-big-play-left-bottom .vjs-big-play-button {
    top: auto;
    left: 0.5vw;
    bottom: 0.5vw;
    font-size: 1.8vw;
}
</style>