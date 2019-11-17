<template>
    <v-layout wrap my-2>
        <v-flex xs12>
            <v-carousel cycle hide-delimiters show-arrows-on-hover height="380">
                <v-carousel-item v-for="(poster, i) in posters" :key="i" :src="poster.src"/>
            </v-carousel>
        </v-flex>
        <v-card outlined class="mt-4">
            <v-toolbar dense flat>
                <v-toolbar-title>最新视频</v-toolbar-title>
                <v-spacer/>
                <div class="font-italic">
                    <span>今日更新 <em class="red--text text--darken-3">{{cards.length}}</em> 部 共 <em class="red--text text--darken-3">9999876</em> 部</span>
                    <a href="#" target="_blank" class="ml-4 grey--text text--darken-3 v-link">更多...</a>
                </div>
            </v-toolbar>
            <v-container fluid pt-0>
                <v-row dense>
                    <v-col v-for="(card, i) in cards" :key="i" cols="2">
                        <v-hover v-slot:default="{ hover }">
                            <v-card>
                                <v-img :src="card.src" height="250">
                                    <v-expand-transition>
                                        <div class="d-flex transition-fast-in-fast-out grey darken-3 v-card--reveal"
                                             v-if="hover">
                                            <v-btn icon class="white--text">
                                                <v-icon x-large>play_circle_outline</v-icon>
                                            </v-btn>
                                        </div>
                                    </v-expand-transition>
                                </v-img>
                                <v-card-subtitle class="text-center py-1">
                                    <div class="subtitle-1">{{card.title}}</div>
                                    <div class="subtitle-2">{{card.createdAt}}</div>
                                </v-card-subtitle>
                            </v-card>
                        </v-hover>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-layout>
</template>

<script>
export default {
    data: () => ({
        posters: [
            {title: '复仇者联盟', src: require('@/assets/Slide-01.jpg')},
            {title: '霍比特人', src: require('@/assets/Slide-02.jpg')},
            {title: '巴霍巴利王', src: require('@/assets/Slide-03.jpg')},
            {title: '独立日', src: require('@/assets/Slide-04.jpg')}
        ],
        cards: [
            {title: '黑夜传说', src: require('@/assets/Card-01.jpg'), createdAt: '2019-01-01'},
            {title: '变形金刚', src: require('@/assets/Card-02.jpg'), createdAt: '2019-01-01'},
            {title: '黑客帝国', src: require('@/assets/Card-03.jpg'), createdAt: '2019-01-01'},
            {title: '泰坦尼克', src: require('@/assets/Card-04.jpg'), createdAt: '2019-01-01'},
            {title: '权力的游戏', src: require('@/assets/Card-05.jpg'), createdAt: '2019-01-01'},
            {title: '肖申克的救赎', src: require('@/assets/Card-06.jpg'), createdAt: '2019-01-01'},
        ]
    }),
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