<template>
    <v-lazy>
        <v-card outlined>
            <slot>
                <video-card-poster v-bind="{vid, type, poster, posterThumb}"/>
                <video-card-title v-bind="{vid, type, title, subtitle}"/>
            </slot>
        </v-card>
    </v-lazy>
</template>

<script>
import VideoCardPoster from './VideoCardPoster';
import VideoCardTitle from './VideoCardTitle';

export default {
    name: 'VideoCard',
    components: {VideoCardPoster, VideoCardTitle},
    props: {
        vid: [Number, String],
        type: String,
        poster: String,
        posterThumb: String,
        title: String,
        subtitle: String
    }
};
</script>
