<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="3">
                <v-img :src="require(`@/assets/img/${video.poster}`)" max-width="360px" max-height="480px"/>
            </v-col>
            <v-col cols="12" md="9">
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
                <p class="my-1 pl-12 mt-4">
                    <v-btn to="/video/play" target="_blank" color="primary">立即播放</v-btn>
                </p>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <video-panel v-bind="videoPanel">
                    <template v-slot:default>
                        <v-container>
                            <v-row dense>
                                <v-col v-for="(item, i) in videoPanel.items" :key="i" cols="4" md="3" lg="2">
                                    <v-lazy>
                                        <video-card v-bind="item"/>
                                    </v-lazy>
                                </v-col>
                            </v-row>
                        </v-container>
                    </template>
                </video-panel>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import VideoPanel from '@/components/shared/VideoPanel';
import VideoCard from '@/components/shared/VideoCard';
export default {
    name: 'VideoDetail',
    components: {VideoPanel, VideoCard},
    data: () => ({
        video: require('@/data/video.json'),
        videoPanel: {
            title: '猜你喜欢',
            url: '/video/list',
            items: require('@/data/videos.json'),
        },
    }),
};
</script>