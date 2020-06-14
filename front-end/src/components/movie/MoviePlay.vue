<template>
    <v-container v-if="video">
        <v-row dense no-gutters>
            <v-col cols="12" lg="9">
                <video-player :options="playerOpts"/>
                <v-card tile flat dark>
                    <v-card-title>{{video.altTitle}}</v-card-title>
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
                                <v-btn :to="`/${video.type}/play/${video.id}?tag=${video.tag}`" color="primary mx-2">
                                    {{video.tag}}
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
    name: 'MoviePlay',
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
            genres: (state) => state[DICT_TYPES.MOVIE_GENRE]
        })
    },
    mounted() {
        axios.get(`${API.VIDEOS}/${this.vid}`).then(res => {
            this.video = res.data;
            const {sources} = res.data;
            console.info(sources)
            if (sources && sources.length) {
                this.playerOpts.sources = [
                    {src: sources[0].v},
                    {src: sources[0].v, type: 'video/webm'}
                ];
            }
        });
        axios.get(API.VIDEOS, {
            params: {
                page: Paging.PAGE,
                pageSize: Paging.PAGE_SIZE,
                type: VodType.MOVIE
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
</script>
