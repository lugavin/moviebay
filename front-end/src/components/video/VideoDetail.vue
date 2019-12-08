<template>
    <v-container>
        <v-row>
            <v-col cols="3">
                <v-img :src="require(`@/assets/img/${poster}`)" max-width="360px" max-height="480px"/>
            </v-col>
            <v-col cols="9">
                <h3>肖申克的救赎</h3>
                <p class="my-1 body-1">导演：弗兰克·德拉邦特</p>
                <p class="my-1 body-1">主演：曼 / 鲍勃·冈顿 / 威廉姆·赛德勒</p>
                <p class="my-1 body-1">类型：剧情 / 地区：欧美 / 年份：1994</p>
                <p class="my-1 body-1 pl-12">
                    <span class="ml-n12">简介：</span>
                    <span>20世纪40年代末，小有成就的青年银行家安迪（蒂姆·罗宾斯 Tim Robbins
                    饰）因涉嫌杀害妻子及她的情人而锒铛入狱。在这座名为肖申克的监狱内，希望似乎虚无缥缈，终身监禁的惩罚无疑注定了安迪接下来灰暗绝望的人生。未过多久，安迪尝试接近囚犯中颇有声望的瑞德（摩根·弗里曼
                    Morgan Freeman
                    饰），请求对方帮自己搞来小锤子。以此为契机，二人逐渐熟稔，安迪也仿佛在鱼龙混杂、罪恶横生、黑白混淆的牢狱中找到属于自己的求生之道。他利用自身的专业知识，帮助监狱管理层逃税、洗黑钱，同时凭借与瑞德的交往在犯人中间也渐渐受到礼遇。表面看来，他已如瑞德那样对那堵高墙从憎恨转变为处之泰然，但是对自由的渴望仍促使他朝着心中的希望和目标前进。而关于其罪行的真相，似乎更使这一切朝前推进了一步……
                    本片根据著名作家斯蒂芬·金（Stephen Edwin King）的原著改编</span>
                </p>
                <p class="my-1 body-1 pl-12 mt-5">
                    <v-btn to="/video/play" target="_blank" color="primary">立即播放</v-btn>
                </p>
            </v-col>
        </v-row>
        <v-row dense>
            <v-col>
                <v-card outlined>
                    <v-toolbar dense flat class="grey lighten-3">
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
        poster: 'poster-06.jpg',
        videos: require('@/data/videos.json'),
    }),
};
</script>