<template>
    <v-lazy>
        <v-card outlined>
            <slot>
                <video-card-poster v-bind="{vid, poster}"/>
                <video-card-title v-bind="{vid, title, subtitle}"/>
            </slot>
        </v-card>
    </v-lazy>
</template>

<script>
import VideoCardPoster from '@/components/shared/VideoCardPoster';
import VideoCardTitle from '@/components/shared/VideoCardTitle';

export default {
    name: 'VideoCard',
    components: {VideoCardPoster, VideoCardTitle},
    props: {
        vid: [Number, String],
        poster: String,
        title: String,
        subtitle: String,
    },
}
</script>
