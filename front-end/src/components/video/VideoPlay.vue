<template>
    <v-container v-if="video">
        <v-row dense no-gutters>
            <v-col cols="12" lg="9">
                <video-player :options="playerOpts"/>
                <v-card tile flat dark>
                    <v-card-title>{{video.title}}</v-card-title>
                    <v-card-subtitle class="py-2">
                        {{imdbRating}} / {{video.year}} / {{video.countries.join(' · ')}} / {{video.genres.map(k=>genres[k]).join(' · ')}}
                        <a class="v-link" @click="expand=!expand">
                            详情<v-icon small>{{expand?'keyboard_arrow_up':'keyboard_arrow_down'}}</v-icon>
                        </a>
                    </v-card-subtitle>
                    <v-card-text :class="[{'d-none': !expand}]">
                        <p class="my-1">
                            导演：{{video.directors.join(' / ')}}
                        </p>
                        <p class="my-1">
                            编剧：{{video.writers.join(' / ')}}
                        </p>
                        <p class="my-1">
                            主演：{{video.actors.join(' / ')}}
                        </p>
                        <p class="my-1">语言：{{video.languages.join(' / ')}}</p>
                        <p class="my-1">简介：{{video.plot}}</p>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" lg="3">
                <v-tabs dark slider-color="orange darken-1">
                    <v-tab>播放列表</v-tab>
                    <v-tab>相关推荐</v-tab>
                    <v-tab-item>
                        <v-card tile flat dark class="v-card-content hide-scrollbar">
                            <v-card-text>
                                <v-btn v-for="{k} in video.src" :key="k" :to="`/video/play/${video.id}?tags=${k}`" color="primary">
                                    {{k}}
                                </v-btn>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card tile flat dark class="v-card-content hide-scrollbar">
                            <v-container>
                                <v-row dense>
                                    <v-col v-for="(video, i) in videos" :key="i" cols="4" md="3" lg="6">
                                        <video-card>
                                            <video-card-poster v-bind="video">
                                                <h4 class="font-weight-medium pa-1">{{video.title}}</h4>
                                            </video-card-poster>
                                        </video-card>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card>
                    </v-tab-item>
                </v-tabs>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';
import {mapState} from 'vuex';
import {DICT_TYPES} from '@/plugins/store-types';
import Base from '@/components/util/Base';
import VideoPlayer from '@/components/shared/VideoPlayer';
import VideoCard from '@/components/shared/VideoCard';
import VideoCardPoster from '@/components/shared/VideoCardPoster';

/**
 * @see https://docs.videojs.com/tutorial-vue.html
 */
export default {
    name: 'VideoPlay',
    components: {VideoPlayer, VideoCard, VideoCardPoster},
    props: {
        vid: {
            type: [Number, String],
            required: true
        },
    },
    data: () => ({
        video: null,
        imdbRating: null,
        playerOpts: {
            controls: true,
            preload: 'auto',
            poster: require('@/assets/poster.png'),
            sources: null,
        },
        videos: require('@/data/videos.json'),
        expand: false,
        playTimes: 0, // TODO 播放次数待实现
    }),
    computed: {
        ...mapState({
            genres(state) {
                switch (this.video.type) {
                    case 'movie':
                        return state[DICT_TYPES.MOVIE_GENRE];
                    case 'drama':
                        return state[DICT_TYPES.DRAMA_GENRE];
                    default:
                        return [];
                }
            }
        })
    },
    mounted() {
        axios.get(`/api/videos/${this.vid}`).then(res => {
            const src = res.data.src;
            if (src.length) {
                this.playerOpts.sources = [
                    {src: src[0].v},
                    {src: src[0].v, type: 'video/webm'},
                ];
            }
            this.video = res.data;
            Base.jsonp(`https://api.douban.com/v2/movie/imdb/${this.video.imdbId}`, {
                apikey: '0df993c66c0c636e29ecbb5344252a4a'
            }, (res) => {
                this.imdbRating = res.rating['average'];
            });
        });
    },
}
</script>