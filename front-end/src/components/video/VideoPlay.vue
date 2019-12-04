<template>
    <v-row>
        <v-col cols="12">
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
                </v-col>
                <v-col cols="3" class="grey">播放列表</v-col>
                <v-col cols="9" class="grey">影片详情</v-col>
            </v-row>
        </v-col>
    </v-row>
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