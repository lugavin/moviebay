<template>
    <v-card outlined>
        <v-toolbar dense flat class="grey lighten-4">
            <h4 class="font-weight-medium">
                <router-link class="v-link" :to="url">{{title}}</router-link>
            </h4>
            <v-spacer/>
            <slot/>
        </v-toolbar>
        <v-container>
            <v-row dense>
                <v-col v-for="(item, i) in items" :key="i" cols="4" md="3" lg="2">
                    <v-lazy>
                        <v-card outlined>
                            <v-hover v-slot:default="{ hover }">
                                <v-img :src="require(`@/assets/img/${item.poster}`)">
                                    <v-expand-transition>
                                        <div class="d-flex transition-fast-in-fast-out grey darken-3 v-card--reveal"
                                             v-if="hover">
                                            <v-btn icon class="white--text" to="/video/play" target="_blank">
                                                <v-icon x-large>play_circle_outline</v-icon>
                                            </v-btn>
                                        </div>
                                    </v-expand-transition>
                                </v-img>
                            </v-hover>
                            <v-card-text class="text-center py-1">
                                <p class="mb-0">
                                    <router-link class="subtitle-1 v-link" to="/video/detail" v-text="item.title"/>
                                </p>
                                <p class="mb-0">
                                    <span class="subtitle-2">{{item.createdAt}}</span>
                                </p>
                            </v-card-text>
                        </v-card>
                    </v-lazy>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
/**
 * @see https://cn.vuejs.org/v2/guide/components-props.html
 */
export default {
    name: 'VideoPanel',
    props: {
        url: String,
        title: String,
        items: []
    },
}
</script>