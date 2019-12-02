<template>
    <v-layout wrap my-2>
        <video id="my-player" class="video-js vjs-big-play-left-bottom" controls preload="auto"
               :poster="video.poster" data-setup='{}' height="500px">
            <source :src="video.url" type="video/webm"/>
            <p class="vjs-no-js">
                To view this video please enable JavaScript, and consider upgrading to a web browser that
                <a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
            </p>
        </video>
    </v-layout>
</template>

<script>
import videojs from 'video.js';

export default {
    name: 'VideoPlay',
    data: () => ({
        video: {
            id: '1001',
            poster: require('@/assets/poster.jpg'),
            url: require('@/data/001.mp4')
        },
    }),
    mounted() {
        videojs('my-player');
    },
};
</script>

<style>
@import "~video.js/dist/video-js.min.css";

.vjs-big-play-left-bottom .vjs-big-play-button {
    top: auto;
    bottom: 10px !important;
    font-size: 2.8em;
}
</style>