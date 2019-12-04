<template>
    <v-row>
        <v-col cols="12">
            <v-carousel cycle hide-delimiters show-arrows-on-hover height="380">
                <v-carousel-item v-for="(poster, i) in posters" :key="i" :src="poster.src"/>
            </v-carousel>
        </v-col>
        <v-col cols="12">
            <v-card outlined>
                <v-toolbar dense flat class="grey lighten-3">
                    <h4 class="font-weight-medium">
                        <router-link class="v-link" to="/video/list">最新视频</router-link>
                    </h4>
                    <v-spacer/>
                    <ul class="list text-small">
                        <li class="hidden-sm-and-down list-item">
                            今日更新 <span class="red--text text--darken-3">{{videos.length}}</span> 部
                            共 <span class="red--text text--darken-3">9999876</span> 部
                            <span class="mx-2"></span>
                        </li>
                        <li class="list-item">
                            <router-link class="v-link" to="/video/list">更多...</router-link>
                        </li>
                    </ul>
                </v-toolbar>
                <v-container>
                    <v-row dense>
                        <v-col v-for="(video, i) in videos" :key="i" cols="4" md="3" lg="2">
                            <v-card>
                                <v-hover v-slot:default="{ hover }">
                                    <v-img :src="video.src" max-width="360" max-height="480">
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
                                    <div class="subtitle-1">
                                        <router-link class="v-link" to="/video/detail">{{video.title}}</router-link>
                                    </div>
                                    <div class="subtitle-2">{{video.createdAt}}</div>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-col>
        <v-col cols="12">
            <v-card outlined>
                <v-toolbar dense flat class="grey lighten-3">
                    <h4 class="font-weight-medium">
                        <router-link class="v-link" to="/video/list">电影</router-link>
                    </h4>
                    <v-spacer/>
                    <ul class="list text-small">
                        <li v-for="genre in films.genre" :key="genre.value" class="hidden-sm-and-down list-item">
                            <router-link class="v-link" to="/">{{genre.label}}</router-link>
                            <span class="mx-2">/</span>
                        </li>
                        <li class="list-item">
                            <router-link class="v-link" to="/video/list">更多...</router-link>
                        </li>
                    </ul>
                </v-toolbar>
                <v-container>
                    <v-row dense>
                        <v-col v-for="(video, i) in videos" :key="i" cols="4" md="3" lg="2">
                            <v-card>
                                <v-hover v-slot:default="{ hover }">
                                    <v-img :src="video.src" max-width="360" max-height="480">
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
                                    <div class="subtitle-1">
                                        <router-link class="v-link" to="/video/detail">{{video.title}}</router-link>
                                    </div>
                                    <div class="subtitle-2">{{video.createdAt}}</div>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-col>
        <v-col cols="12">
            <v-card outlined>
                <v-toolbar dense flat class="grey lighten-3">
                    <h4 class="font-weight-medium">
                        <router-link class="v-link" to="/video/list">连续剧</router-link>
                    </h4>
                    <v-spacer/>
                    <ul class="list text-small">
                        <li v-for="genre in dramas.genre" :key="genre.value" class="hidden-sm-and-down list-item">
                            <router-link class="v-link" to="/">{{genre.label}}</router-link>
                            <span class="mx-2">/</span>
                        </li>
                        <li class="list-item">
                            <router-link class="v-link" to="/video/list">更多...</router-link>
                        </li>
                    </ul>
                </v-toolbar>
                <v-container>
                    <v-row dense>
                        <v-col v-for="(video, i) in videos" :key="i" cols="4" md="3" lg="2">
                            <v-card>
                                <v-hover v-slot:default="{ hover }">
                                    <v-img :src="video.src" max-width="360" max-height="480">
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
                                    <div class="subtitle-1">
                                        <router-link class="v-link" to="/video/detail">{{video.title}}</router-link>
                                    </div>
                                    <div class="subtitle-2">{{video.createdAt}}</div>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: 'Home',
        data: () => ({
            posters: [
                {title: '复仇者联盟', src: require('@/assets/Slide-01.jpg')},
                {title: '霍比特人', src: require('@/assets/Slide-02.jpg')},
                {title: '巴霍巴利王', src: require('@/assets/Slide-03.jpg')},
                {title: '独立日', src: require('@/assets/Slide-04.jpg')}
            ],
            videos: [
                {title: '黑夜传说', src: require('@/assets/Card-01.jpg'), createdAt: '2019-01-01'},
                {title: '变形金刚', src: require('@/assets/Card-02.jpg'), createdAt: '2019-01-01'},
                {title: '黑客帝国', src: require('@/assets/Card-03.jpg'), createdAt: '2019-01-01'},
                {title: '泰坦尼克', src: require('@/assets/Card-04.jpg'), createdAt: '2019-01-01'},
                {title: '权力的游戏', src: require('@/assets/Card-05.jpg'), createdAt: '2019-01-01'},
                {title: '肖申克的救赎', src: require('@/assets/Card-06.jpg'), createdAt: '2019-01-01'},
            ],
            films: {
                genre: [
                    {value: 1, label: '动作片'},
                    {value: 2, label: '喜剧片'},
                    {value: 3, label: '爱情片'},
                    {value: 4, label: '科幻片'},
                    {value: 5, label: '恐怖片'},
                    {value: 6, label: '剧情片'},
                    {value: 7, label: '战争片'},
                    {value: 8, label: '纪录片'},
                ],
            },
            dramas: {
                genre: [
                    {value: 1, label: '国产剧'},
                    {value: 2, label: '港台剧'},
                    {value: 3, label: '日韩剧'},
                    {value: 4, label: '欧美剧'},
                    {value: 5, label: '其他剧'}
                ],
            },
        }),
    };
</script>
