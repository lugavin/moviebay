<template>
    <v-hover v-slot:default="{ hover }">
        <v-img :src="poster" :lazy-src="posterThumb" class="align-end text-center">
            <v-expand-transition>
                <div class="d-flex transition-fast-in-fast-out grey darken-3 v-card--reveal" v-if="hover">
                    <v-btn icon class="white--text" :to="`/video/play/${vid}`" target="_blank">
                        <v-icon x-large>play_circle_outline</v-icon>
                    </v-btn>
                </div>
            </v-expand-transition>
            <slot/>
        </v-img>
    </v-hover>
</template>

<script>
export default {
    name: 'VideoCardPoster',
    props: {
        vid: {
            type: [Number, String],
            required: true
        },
        poster: {
            type: String,
            required: true
        },
        posterThumb: {
            type: String,
            required: true
        }
    }
};
</script>

<style>
.v-card--reveal {
    width: 100%;
    height: 100%;
    opacity: .5;
    bottom: 0;
    position: absolute;
    align-items: center;
    justify-content: center;
}
</style>
