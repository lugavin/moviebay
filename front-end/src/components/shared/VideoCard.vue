<template>
    <v-card outlined>
        <v-hover v-slot:default="{ hover }">
            <v-img :src="require(`@/assets/img/${poster}`)">
                <v-expand-transition>
                    <div class="d-flex transition-fast-in-fast-out grey darken-3 v-card--reveal" v-if="hover">
                        <v-btn icon class="white--text" to="/video/play" target="_blank">
                            <v-icon x-large>play_circle_outline</v-icon>
                        </v-btn>
                    </div>
                </v-expand-transition>
            </v-img>
        </v-hover>
        <v-card-text class="text-center py-1">
            <p class="mb-0">
                <router-link class="subtitle-1 v-link" to="/video/detail" v-text="title"/>
            </p>
            <p class="mb-0">
                <span class="subtitle-2" v-text="subtitle"/>
            </p>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'VideoCard',
    props: {
        poster: String,
        title: String,
        subtitle: String,
    },
}
</script>
