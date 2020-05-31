<template>
    <v-container v-if="video">
        <v-row dense no-gutters>
            <v-col cols="12" lg="9">
                <video-player :options="playerOpts"/>
                <v-card tile flat dark>
                    <v-card-title>{{video.title}}</v-card-title>
                    <v-card-subtitle class="py-2">
                        {{video.imdbRating}} / {{video.year}} / {{video.countries.join(' · ')}} / {{video.genres.map(k=>genres[k]).join(' · ')}}
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
                                <v-btn v-for="tag in video.tags" :key="tag" :to="`/video/play/${video.id}?tags=${tag}`" color="primary mx-2">
                                    {{tag}}
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
import {Formatter, Paging, API} from '@/components/util/consts';
import {VideoCard, VideoCardPoster, VideoPlayer} from '@/components/shared';
import * as dayjs from 'dayjs';

/**
 * @see https://docs.videojs.com/tutorial-vue.html
 */
export default {
    name: 'VideoPlay',
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
        playerOpts: {
            controls: true,
            preload: 'auto',
            poster: require('@/assets/poster.png'),
            sources: null
        },
        expand: false,
        playTimes: 0 // TODO 播放次数待实现
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
        axios.get(`${API.videos}/${this.vid}`).then(res => {
            this.video = res.data;
            const src = this.video.src;
            this.playerOpts.sources = [{src}, {src, type: 'video/webm'}];
            return this.video;
        }).then(vod => {
            const params = {
                page: Paging.page,
                pageSize: Paging.pageSize,
                type: vod.type
            };
            axios.get(API.videos, {params}).then(res => {
                this.videos = res.data.items.map(item => ({
                    vid: item.id,
                    poster: item.poster,
                    posterThumb: item.posterThumb,
                    title: item.title,
                    subtitle: dayjs(item.createdAt).format(Formatter.DATE)
                }));
            });
        });
    }
}
</script>