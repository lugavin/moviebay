<template>
    <v-container>
        <v-row>
            <v-col cols="3">
                <v-img :src="require(`@/assets/img/${video.poster}`)" max-width="360px" max-height="480px"/>
            </v-col>
            <v-col cols="9">
                <h3>{{video.title}}</h3>
                <p class="my-1">
                    导演：<label v-for="(item, i) in video.directors" :key="i"><a href="#" class="v-link">{{item.name}}</a><span v-if="i!==video.directors.length-1"> / </span></label>
                </p>
                <p class="my-1">
                    主演：<label v-for="(item, i) in video.actors" :key="i"><a href="#" class="v-link">{{item.name}}</a><span v-if="i!==video.actors.length-1"> / </span></label>
                </p>
                <p class="my-1">
                    类型：<label v-for="(item, i) in video.genres" :key="i"><a href="#" class="v-link">{{item.name}}</a><span v-if="i!==video.genres.length-1"> / </span></label>
                </p>
                <p class="my-1">地区：{{video.area}}</p>
                <p class="my-1">年份：{{video.year}}</p>
                <p class="my-1 pl-12">
                    <span class="ml-n12">简介：</span>
                    <span>{{video.intro}}</span>
                </p>
                <p class="my-1 pl-12 mt-5">
                    <v-btn to="/video/play" target="_blank" color="primary">立即播放</v-btn>
                </p>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card outlined>
                    <v-toolbar dense flat class="grey lighten-4">
                        <h4 class="font-weight-medium">
                            <router-link class="v-link" to="/video/list">猜你喜欢</router-link>
                        </h4>
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
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'VideoDetail',
    data: () => ({
        video: require('@/data/video.json'),
        videos: require('@/data/videos.json'),
    }),
};
</script>