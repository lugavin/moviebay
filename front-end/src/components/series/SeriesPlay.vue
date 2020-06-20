<template>
    <v-container v-if="video">
        <v-row dense no-gutters>
            <v-col cols="12" lg="9">
                <video-player :options="playerOpts"/>
                <v-card tile flat dark>
                    <v-card-title>{{video.altTitle}}</v-card-title>
                    <v-card-subtitle class="py-2">
                        {{video.imdbRating}} / {{video.year}} / {{video.countries.map(k=>countries[k]).join(' · ')}} / {{video.genres.map(k=>genres[k]).join(' · ')}}
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
                            <v-card-text class="text-center">
                                <ul class="pl-3">
                                    <li class="d-block float-left" v-for="(ep, i) in episodes" :key="i">
                                        <v-btn :color="ep.episode===activeEpisode.episode?'primary':''"
                                               @click="play(ep)" small width="16" class="ma-1">
                                            {{ep.title}}
                                        </v-btn>
                                    </li>
                                </ul>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card tile flat dark class="v-card-content hide-scrollbar">
                            <v-container>
                                <v-row dense>
                                    <v-col v-for="(video, i) in videos" :key="i" cols="4" md="3" lg="6">
                                        <video-card>
                                            <video-card-poster v-bind="video" :title="video.title"/>
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
import * as dayjs from 'dayjs';
import {mapState} from 'vuex';
import {DICT_TYPES} from '@/plugins/store-types';
import {API, Paging, VodType, Formatter} from '@/shared';
import {VideoCard, VideoCardPoster, VideoPlayer} from '@/components/video';

/**
 * @see https://docs.videojs.com/tutorial-vue.html
 */
export default {
    name: 'SeriesPlay',
    components: {VideoCard, VideoCardPoster, VideoPlayer},
    props: {
        vid: {
            type: [Number, String],
            required: true
        }
    },
    data: () => ({
        video: null,
        videos: [],
        episodes: [],
        activeEpisode: null,
        playerOpts: {
            controls: true,
            preload: 'auto',
            poster: require('@/assets/poster.png'),
            sources: null
        },
        expand: false,
        playTimes: 0, // TODO 播放次数待实现
    }),
    computed: {
        ...mapState(Object.values(DICT_TYPES))
    },
    mounted() {
        axios.get(`${API.VIDEOS}/${this.vid}`).then(res => {
            if (res.data) {
                this.video = res.data;
                const {imdbId, latestEpisode} = res.data;
                this.play(latestEpisode);
                this.getEpisodes(imdbId);
            }
        });
        this.getVideos();
    },
    methods: {
        play(ep) {
            this.activeEpisode = ep;
            this.playerOpts.sources = [
                {src: ep.sources[0].v},
                {src: ep.sources[0].v, type: 'video/webm'}
            ];
        },
        getEpisodes(imdbId) {
            axios.get(API.EPISODES, {params: {imdbId}}).then(res => {
                this.episodes = res.data;
            });
        },
        getVideos() {
            axios.get(API.VIDEOS, {
                params: {
                    page: Paging.PAGE,
                    pageSize: Paging.PAGE_SIZE,
                    type: VodType.SERIES
                }
            }).then(res => {
                this.videos = res.data.items.map(item => ({
                    vid: item.id,
                    type: item.type,
                    poster: item.poster,
                    posterThumb: item.posterThumb,
                    title: item.altTitle,
                    subtitle: dayjs(item.createdAt).format(Formatter.DATE)
                }));
            });
        }
    }
}
</script>
