<template>
    <v-container>
        <v-row dense no-gutters>
            <v-col cols="12" md="9">
                <video id="vjs-player" class="video-js vjs-fluid vjs-styles-custom" controls preload
                       :poster="require('@/assets/poster.png')">
                    <source :src="playUrl" type="video/mp4"/>
                    <source :src="playUrl" type="video/webm"/>
                    <p class="vjs-no-js">
                        To view this video please enable JavaScript, and consider upgrading to a web browser
                        that <a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
                    </p>
                </video>
                <v-card tile flat dark>
                    <v-card-title>{{video.title}}</v-card-title>
                    <v-card-subtitle class="py-2">
                        8.4 / {{video.year}} / {{video.area}} / <label v-for="(item, i) in video.genres" :key="i">{{item.name}}<span v-if="i!==video.genres.length-1"> · </span></label> / 2048次播放
                        <a class="white--text" @click="expand=!expand">
                            详情<v-icon>{{expand?'keyboard_arrow_up':'keyboard_arrow_down'}}</v-icon>
                        </a>
                    </v-card-subtitle>
                    <v-card-text :class="[{'d-none': !expand}]">
                        <p class="my-1">
                            导演：<label v-for="(item, i) in video.directors" :key="i">{{item.name}}<span v-if="i!==video.directors.length-1"> / </span></label>
                        </p>
                        <p class="my-1">
                            主演：<label v-for="(item, i) in video.actors" :key="i">{{item.name}}<span v-if="i!==video.actors.length-1"> / </span></label>
                        </p>
                        <p class="my-1">
                            类型：<label v-for="(item, i) in video.genres" :key="i">{{item.name}}<span v-if="i!==video.genres.length-1"> / </span></label>
                        </p>
                        <p class="my-1">地区：{{video.area}}</p>
                        <p class="my-1">年份：{{video.year}}</p>
                        <p class="my-1 pl-10">
                            <span class="ml-n10">简介：</span>
                            <span>{{video.intro}}</span>
                        </p>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="3">
                <v-tabs dark slider-color="orange darken-1">
                    <v-tab>播放列表</v-tab>
                    <v-tab>相关推荐</v-tab>
                    <v-tab-item>
                        <v-card tile flat dark class="v-card-content hide-scrollbar">
                            <v-card-text>
                                <v-btn color="primary">1080P</v-btn>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card tile flat dark class="v-card-content hide-scrollbar">
                            <v-container>
                                <v-row dense>
                                    <v-col v-for="(video, i) in videos" :key="i" cols="3" md="6">
                                        <v-card flat outlined>
                                            <v-hover v-slot:default="{ hover }">
                                                <v-img :src="require(`@/assets/img/${video.poster}`)"
                                                       class="align-end text-center">
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
        playUrl: require('@/data/001.mp4'),
        video: require('@/data/video.json'),
        videos: require('@/data/videos.json'),
        expand: false
    }),
    mounted() {
        videojs('vjs-player');
    }
}
</script>

<style>
@import "~video.js/dist/video-js.min.css";

.vjs-styles-custom .vjs-big-play-button {
    top: auto;
}

/*
.scrollbar-outer-container {
    overflow: hidden;
}

.scrollbar-inner-container {
    margin-right: -18px;
    overflow-x: hidden;
    overflow-y: scroll;
}
*/

.hide-scrollbar {
    overflow: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.hide-scrollbar::-webkit-scrollbar {
    display: none;
}

@media only screen and (max-width: 959px) {
    .vjs-styles-custom .vjs-big-play-button {
        left: 1vw !important;
        bottom: 2vw !important;
        font-size: 3vw !important;
    }
}

@media only screen and (min-width: 960px) and (max-width: 1263px) {
    .vjs-styles-custom .vjs-big-play-button {
        left: 0.5vw !important;
        bottom: 0.8vw !important;
        font-size: 2vw !important;
    }

    .v-card-content {
        height: 410px !important;
    }
}

@media only screen and (min-width: 1264px) and (max-width: 1903px) {
    .vjs-styles-custom .vjs-big-play-button {
        left: 10px;
        bottom: 10px;
    }

    .v-card-content {
        height: 530px !important;
    }
}

@media only screen and (min-width: 1904px) {
    .vjs-styles-custom .vjs-big-play-button {
        left: 20px !important;
        bottom: 20px !important;
    }

    .v-card-content {
        height: 783px !important;
    }
}
</style>