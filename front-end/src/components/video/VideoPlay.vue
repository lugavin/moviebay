<template>
    <v-container>
        <v-row dense no-gutters>
            <v-col cols="12" md="9">
                <video id="vjs-player" class="video-js vjs-fluid vjs-big-play-left-bottom" controls preload
                       :poster="video.poster">
                    <source :src="video.url" type="video/mp4"/>
                    <source :src="video.url" type="video/webm"/>
                    <p class="vjs-no-js">
                        To view this video please enable JavaScript, and consider upgrading to a web browser that
                        <a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
                    </p>
                </video>
                <v-card tile flat dark>
                    <v-card-title>少年的你</v-card-title>
                    <v-card-subtitle class="py-2">
                        8.4 / 2019 / 大陆 / 剧情 / 2048次播放
                        <a class="white--text" @click="expand=!expand">
                            详情 <v-icon>{{expand?'keyboard_arrow_up':'keyboard_arrow_down'}}</v-icon>
                        </a>
                    </v-card-subtitle>
                    <v-card-text :class="[{'d-none': !expand}]">
                        <p class="mb-1">导演：曾国祥</p>
                        <p class="mb-1">主演：周冬雨 / 易烊千玺</p>
                        <p class="mb-1">类型：剧情 / 爱情 / 犯罪</p>
                        <p class="mb-1">简介：易烊千玺饰演的...</p>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="3">
                <v-tabs dark slider-color="orange darken-1">
                    <v-tab>播放列表</v-tab>
                    <v-tab>相关推荐</v-tab>
                    <v-tab-item>
                        <v-card tile flat dark class="v-card-fixed-height">
                            <v-card-text>
                                <v-btn color="primary">1080P</v-btn>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card tile flat dark class="v-card-fixed-height">
                            <v-container>
                                <v-row dense>
                                    <v-col v-for="(video, i) in videos" :key="i" cols="3" md="6">
                                        <v-card outlined>
                                            <v-hover v-slot:default="{ hover }">
                                                <v-img :src="require(`@/assets/img/${video.poster}`)" class="align-end text-center">
                                                    <v-expand-transition>
                                                        <div class="d-flex transition-fast-in-fast-out grey darken-3 v-card--reveal"
                                                             v-if="hover">
                                                            <v-btn icon class="white--text" to="/video/play"
                                                                   target="_blank">
                                                                <v-icon x-large>play_circle_outline</v-icon>
                                                            </v-btn>
                                                        </div>
                                                    </v-expand-transition>
                                                    <h4 class="font-weight-medium pa-1">{{video.title}}</h4>
                                                </v-img>
                                            </v-hover>
                                        </v-card>
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
import videojs from 'video.js';

/**
 * @see https://docs.videojs.com/tutorial-vue.html
 */
export default {
    name: 'VideoPlay',
    data: () => ({
        expand: false,
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
    left: 1vw;
    bottom: 1vw;
    font-size: 2vw;
}

@media only screen and (max-width: 959px) {
    .vjs-big-play-left-bottom .vjs-big-play-button {
        top: auto;
        left: 2vw !important;
        bottom: 2vw !important;
        font-size: 3vw !important;
    }
}

@media only screen and (min-width: 960px) {
    .v-card-fixed-height {
        height: 410px;
        overflow: auto;
    }

    .v-card-fixed-height::-webkit-scrollbar {
        display: none;
    }
}

@media only screen and (min-width: 1264px) {
    .v-card-fixed-height {
        height: 530px;
        overflow: auto;
    }

    .v-card-fixed-height::-webkit-scrollbar {
        display: none;
    }
}
</style>