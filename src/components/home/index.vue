<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-carousel cycle hide-delimiters show-arrows-on-hover height="380">
                    <v-carousel-item v-for="(item, i) in posters" :key="i" :src="require(`@/assets/img/${item.poster}`)"/>
                </v-carousel>
            </v-col>
            <v-col cols="12">
                <v-card outlined>
                    <v-toolbar dense flat class="grey lighten-4">
                        <h4 class="font-weight-medium">
                            <router-link class="v-link" to="/video/list">最新视频</router-link>
                        </h4>
                        <v-spacer/>
                        <ul class="text-small">
                            <li class="d-block float-left">
                                今日更新 <span class="red--text text--darken-3">{{videos.length}}</span> 部
                                共 <span class="red--text text--darken-3">9999876</span> 部
                                <span class="mx-2"></span>
                            </li>
                            <li class="d-block float-left">
                                <router-link class="v-link" to="/video/list">更多...</router-link>
                            </li>
                        </ul>
                    </v-toolbar>
                    <v-container>
                        <v-row dense>
                            <v-col v-for="(video, i) in videos" :key="i" cols="4" md="3" lg="2">
                                <v-card outlined>
                                    <v-hover v-slot:default="{ hover }">
                                        <v-img :src="require(`@/assets/img/${video.poster}`)">
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
                                            <router-link class="subtitle-1 v-link" to="/video/detail">{{video.title}}</router-link>
                                        </p>
                                        <p class="mb-0">
                                            <span class="subtitle-2">{{video.createdAt}}</span>
                                        </p>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-col>
            <v-col cols="12" v-for="(drama, i) in dramas" :key="i">
                <v-card outlined>
                    <v-toolbar dense flat class="grey lighten-4">
                        <h4 class="font-weight-medium">
                            <router-link class="v-link" :to="drama.url">{{drama.title}}</router-link>
                        </h4>
                        <v-spacer/>
                        <ul class="text-small">
                            <li class="d-block float-left" v-for="genre in drama.genres" :key="genre.value">
                                <router-link class="v-link" to="/">{{genre.label}}</router-link>
                                <span class="mx-2">/</span>
                            </li>
                            <li class="d-block float-left">
                                <router-link class="v-link" :to="drama.url">更多...</router-link>
                            </li>
                        </ul>
                    </v-toolbar>
                    <v-container>
                        <v-row dense>
                            <v-col v-for="(video, i) in drama.videos" :key="i" cols="4" md="3" lg="2">
                                <v-card outlined>
                                    <v-hover v-slot:default="{ hover }">
                                        <v-img :src="require(`@/assets/img/${video.poster}`)">
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
                                            <router-link class="subtitle-1 v-link" to="/video/detail">{{video.title}}</router-link>
                                        </p>
                                        <p class="mb-0">
                                            <span class="subtitle-2">{{video.createdAt}}</span>
                                        </p>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'Home',
    data: () => ({
        posters: require('@/data/posters.json'),
        genres: require('@/data/genres.json'),
        videos: require('@/data/videos.json'),
    }),
    computed: {
        dramas() {
            return [
                {title: '电影', url: '/video/list', genres: this.genres['movie'], videos: this.videos},
                {title: '连续剧', url: '/video/list', genres: this.genres['drama'], videos: this.videos},
            ];
        }
    },
};
</script>
