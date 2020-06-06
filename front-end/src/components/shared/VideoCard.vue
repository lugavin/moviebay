<template>
    <v-lazy>
        <v-card outlined>
            <slot>
                <video-card-poster v-bind="{vid, poster, posterThumb}"/>
                <video-card-title v-bind="{vid, title, subtitle}"/>
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
        poster: String,
        posterThumb: String,
        title: String,
        subtitle: String
    }
};
</script>
