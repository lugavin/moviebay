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

/**
 * @see https://docs.videojs.com/tutorial-options.html
 */
export default {
    name: 'VideoPlayer',
    props: {
        options: {
            type: Object,
            required: true
        }
    },
    data: () => ({
        player: null
    }),
    computed: {
        sources() {
            return this.options.sources;
        }
    },
    watch: {
        sources(newVal) {
            if (newVal) {
                this.player.src(newVal);
                this.player.play();
            }
        }
    },
    mounted() {
        this.player = videojs(this.$refs.player, Object.assign({
            poster: require('@/assets/poster.png'),
            preload: 'auto',
            controls: true
        }, this.options), () => {
            // this.player.play();
            console.info('The Player is ready...');
        });
    },
    beforeDestroy() {
        this.player && this.player.dispose();
    }
};
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
        left: 1vw !important;
        bottom: 1.5vw !important;
        font-size: 2vw !important;
    }

    .v-card-content {
        height: 781px !important;
    }
}
</style>