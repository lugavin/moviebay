<template>
    <v-layout wrap my-2 text-center>
        <v-flex xs12>
            <v-carousel cycle hide-delimiters show-arrows-on-hover height="380">
                <v-carousel-item v-for="(poster, i) in posters" :key="i" :src="poster.src"/>
            </v-carousel>
        </v-flex>
        <v-card outlined class="mt-4">
            <v-toolbar dense flat>
                <v-toolbar-title class="tertiary--text font-weight-light">最新视频</v-toolbar-title>
                <v-spacer/>
                <div class="font-weight-regular">
                    <span class="mr-4">今日更新 {{cards.length}} 部 共 9999999 部</span>
                    <a href="#" target="_blank" class="v-btn--text">更多</a>
                </div>
            </v-toolbar>
            <v-container fluid>
                <v-row dense>
                    <v-col v-for="(card, i) in cards" :key="i" cols="2">
                        <v-card>
                            <v-img :src="card.src" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                   class="white--text align-end" height="250px"/>
                            <!--<v-card-title v-text="card.title"/>-->
                            <v-card-subtitle class="pt-2 pb-0" v-text="card.title"/>
                            <v-card-text class="text--primary" v-text="card.updatedAt"/>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
        <!--
        <v-flex xs12>
            <v-img :src="require('@/assets/logo-522x180.png')" contain class="my-3" height="180"/>
        </v-flex>
        -->
        <!--
        <v-flex mb-4>
            <h1 class="display-2 font-weight-bold mb-3">
                Welcome to Vuetify
            </h1>
            <p class="subheading font-weight-regular">
                For help and collaboration with other Vuetify developers,
                <br>please join our online
                <a href="https://community.vuetifyjs.com" target="_blank">Discord Community</a>
            </p>
        </v-flex>

        <v-flex mb-5 xs12>
            <h2 class="headline font-weight-bold mb-3">What's next?</h2>
            <v-layout justify-center>
                <a v-for="(next, i) in whatsNext" :key="i" :href="next.href" class="subheading mx-3"
                   target="_blank">{{ next.text }}</a>
            </v-layout>
        </v-flex>

        <v-flex xs12 mb-5>
            <h2 class="headline font-weight-bold mb-3">Important Links</h2>

            <v-layout justify-center>
                <a v-for="(link, i) in importantLinks" :key="i" :href="link.href" class="subheading mx-3"
                   target="_blank">{{ link.text }}</a>
            </v-layout>
        </v-flex>

        <v-flex xs12 mb-5>
            <h2 class="headline font-weight-bold mb-3">Ecosystem</h2>
            <v-layout justify-center>
                <a v-for="(eco, i) in ecosystem" :key="i" :href="eco.href" class="subheading mx-3"
                   target="_blank">{{ eco.text }}</a>
            </v-layout>
        </v-flex>
        -->
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
            {title: '黑夜传说', src: require('@/assets/Card-01.jpg'), updatedAt: '2019-01-01'},
            {title: '变形金刚', src: require('@/assets/Card-02.jpg'), updatedAt: '2019-01-01'},
            {title: '黑客帝国', src: require('@/assets/Card-03.jpg'), updatedAt: '2019-01-01'},
            {title: '泰坦尼克', src: require('@/assets/Card-04.jpg'), updatedAt: '2019-01-01'},
            {title: '权力的游戏', src: require('@/assets/Card-05.jpg'), updatedAt: '2019-01-01'},
            {title: '肖生克的救赎', src: require('@/assets/Card-06.jpg'), updatedAt: '2019-01-01'},
        ]
    }),
};
</script>
