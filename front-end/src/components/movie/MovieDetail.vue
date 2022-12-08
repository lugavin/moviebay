<template>
    <v-container v-if="vod">
        <v-row>
            <v-col cols="12" md="4" lg="2">
                <v-img :src="vod.poster" :lazy-src="vod.posterThumb" max-width="360" max-height="540"/>
            </v-col>
            <v-col cols="12" md="8" lg="10">
                <h3>{{vod.altTitle}}</h3>
                <p class="my-1">
                    导演：{{vod.directors.join(' / ')}}
                </p>
                <p class="my-1">
                    编剧：{{vod.writers.join(' / ')}}
                </p>
                <p class="my-1">
                    主演：{{vod.actors.join(' / ')}}
                </p>
                <p class="my-1">
                    类型：{{vod.genres.map(v=>genres[v]).join(' / ')}}
                </p>
                <p class="my-1">地区：{{vod.countries.map(v=>countries[v]).join(' / ')}}</p>
                <p class="my-1">语言：{{vod.languages.join(' / ')}}</p>
                <p class="my-1">年份：{{vod.year}}</p>
                <p class="my-1">片长：{{vod.runtime}}分钟</p>
                <p class="my-1 pl-12">
                    <span class="ml-n12">简介：</span>
                    <span>{{vod.plot}}</span>
                </p>
                <p class="my-1 pl-12 mt-4">
                    <v-btn :to="`/${vod.type}/play/${vod.id}`" target="_blank" color="primary">立即播放</v-btn>
                </p>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <video-panel v-bind="{title: '猜你喜欢', type: vod.type}"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';
import {mapState} from 'vuex';
import {API} from '@/shared';
import {DICT_TYPES} from '@/plugins/store-types';
import {VideoPanel} from '@/components/video';

export default {
    name: 'MovieDetail',
    components: {VideoPanel},
    props: {
        vid: {
            type: [Number, String],
            required: true
        }
    },
    data: () => ({
        vod: null
    }),
    computed: {
        ...mapState(Object.values(DICT_TYPES))
    },
    mounted() {
        axios.get(`${API.VIDEOS}/${this.vid}`).then(res => {
            this.vod = res.data;
        });
    }
};
</script>