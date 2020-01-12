<template>
    <video ref="player" class="video-js vjs-fluid vjs-styles-custom" oncontextmenu="return false">
        <p class="vjs-no-js">
            To view this video please enable JavaScript, and consider upgrading to a web browser
            that <a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
        </p>
    </video>
</template>

<script>
import videojs from 'video.js';

export default {
    name: 'VideoPlayer',
    props: {
        options: {
            type: Object,
            default() {
                return {};
            }
        },
    },
    data() {
        return {
            player: null
        }
    },
    mounted() {
        this.player = videojs(this.$refs.player, this.options, function () {
            console.info('The Player is ready...');
        });
    },
    beforeDestroy() {
        this.player && this.player.dispose();
    }
}
</script>

<style>
@import "~video.js/dist/video-js.min.css";

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

.vjs-styles-custom .vjs-big-play-button {
    top: auto;
    left: 10px;
    bottom: 10px;
}

@media only screen and (max-width: 959px) {
    .vjs-styles-custom .vjs-big-play-button {
        left: 1vw !important;
        bottom: 2vw !important;
        font-size: 3vw !important;
    }
}

@media only screen and (min-width: 1264px) and (max-width: 1903px) {
    .v-card-content {
        height: 528px !important;
    }
}

@media only screen and (min-width: 1904px) {
    .vjs-styles-custom .vjs-big-play-button {
        left: 20px !important;
        bottom: 20px !important;
    }

    .v-card-content {
        height: 781px !important;
    }
}
</style>