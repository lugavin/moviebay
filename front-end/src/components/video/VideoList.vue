<template>
    <v-layout wrap my-2>
        <v-expansion-panels>
            <v-expansion-panel>
                <v-expansion-panel-header ripple>
                    <div>共检索到 <span class="red--text text--darken-3">{{rows}}</span> 条结果</div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <div>
                        <label>按类型：</label>
                        <label v-for="genre in genre" :key="genre.value" :for="'genre-'+genre.value" class="mr-4">
                            <input :id="'genre-'+genre.value" name="genre" type="radio"> {{genre.label}}
                        </label>
                    </div>
                    <div>
                        <label>按年份：</label>
                        <label v-for="year in years" :key="year" :for="'year-'+year" class="mr-4">
                            <input :id="'year-'+year" name="year" type="radio"> {{year}}
                        </label>
                    </div>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
        <v-row dense class="py-2">
            <v-col v-for="(video, i) in videos" :key="i" cols="4" md="3" lg="2" class="py-2">
                <v-card>
                    <v-hover v-slot:default="{ hover }">
                        <v-img :src="video.src" max-width="360" max-height="480">
                            <v-expand-transition>
                                <div class="d-flex transition-fast-in-fast-out grey darken-3 v-card--reveal"
                                     v-if="hover">
                                    <v-btn icon class="white--text" to="/video/play">
                                        <v-icon x-large>play_circle_outline</v-icon>
                                    </v-btn>
                                </div>
                            </v-expand-transition>
                        </v-img>
                    </v-hover>
                    <v-card-subtitle class="text-center py-1">
                        <div class="subtitle-1">
                            <router-link class="v-link" to="/video/detail">{{video.title}}</router-link>
                        </div>
                        <div class="subtitle-2">{{video.createdAt}}</div>
                    </v-card-subtitle>
                </v-card>
            </v-col>
        </v-row>
        <v-flex xs12 text-center>
            <v-pagination v-model="page" :length="rows" :total-visible="7"></v-pagination>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    name: 'VideoList',
    data: () => ({
        page: 1,
        rows: 15,
        videos: [
            {title: '黑夜传说', src: require('@/assets/Card-01.jpg'), createdAt: '2019-01-01'},
            {title: '变形金刚', src: require('@/assets/Card-02.jpg'), createdAt: '2019-01-01'},
            {title: '黑客帝国', src: require('@/assets/Card-03.jpg'), createdAt: '2019-01-01'},
            {title: '泰坦尼克', src: require('@/assets/Card-04.jpg'), createdAt: '2019-01-01'},
            {title: '权力的游戏', src: require('@/assets/Card-05.jpg'), createdAt: '2019-01-01'},
            {title: '肖申克的救赎', src: require('@/assets/Card-06.jpg'), createdAt: '2019-01-01'},
            {title: '黑夜传说', src: require('@/assets/Card-01.jpg'), createdAt: '2019-01-01'},
            {title: '变形金刚', src: require('@/assets/Card-02.jpg'), createdAt: '2019-01-01'},
            {title: '黑客帝国', src: require('@/assets/Card-03.jpg'), createdAt: '2019-01-01'},
            {title: '泰坦尼克', src: require('@/assets/Card-04.jpg'), createdAt: '2019-01-01'},
            {title: '权力的游戏', src: require('@/assets/Card-05.jpg'), createdAt: '2019-01-01'},
            {title: '肖申克的救赎', src: require('@/assets/Card-06.jpg'), createdAt: '2019-01-01'},
        ],
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
        years: [2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012],
    }),
};
</script>