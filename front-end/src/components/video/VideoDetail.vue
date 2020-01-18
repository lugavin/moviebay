<template>
    <v-container>
        <v-row v-if="video">
            <v-col cols="12" md="3">
                <v-img :src="require(`@/assets/img/${video.poster}`)" max-width="360px" max-height="480px"/>
            </v-col>
            <v-col cols="12" md="9">
                <h3>{{video.title}}</h3>
                <p class="my-1">
                    导演：{{video.directors.map(r=>r.v).join(' / ')}}
                </p>
                <p class="my-1">
                    编剧：{{video.writers.map(r=>r.v).join(' / ')}}
                </p>
                <p class="my-1">
                    主演：{{video.actors.map(r=>r.v).join(' / ')}}
                </p>
                <p class="my-1">
                    类型：{{video.genres.map(r=>r.v).join(' / ')}}
                </p>
                <p class="my-1">地区：{{video.countries.map(r=>r.v).join(' / ')}}</p>
                <p class="my-1">语言：{{video.languages.map(r=>r.v).join(' / ')}}</p>
                <p class="my-1">年份：{{video.year}}</p>
                <p class="my-1 pl-12">
                    <span class="ml-n12">简介：</span>
                    <span>{{video.plot}}</span>
                </p>
                <p class="my-1 pl-12 mt-4">
                    <v-btn :to="`/video/play/${video.id}`" target="_blank" color="primary">立即播放</v-btn>
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
import axios from 'axios';

export default {
    name: 'VideoDetail',
    components: {VideoPanel, VideoCard},
    props: {
        vid: {
            type: [Number, String],
            required: true
        },
    },
    data: () => ({
        video: null,
        videoPanel: {
            title: '猜你喜欢',
            items: require('@/data/videos.json'),
        },
    }),
    mounted() {
        axios.get(`/api/videos/${this.vid}`).then(res => {
            this.video = res.data;
        });
    },
};
</script>