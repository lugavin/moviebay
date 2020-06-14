<template>
    <v-card outlined>
        <v-toolbar dense flat class="grey lighten-4">
            <h4 class="font-weight-medium">
                <router-link class="v-link" :to="`/${type}/more`" target="_blank">{{title}}</router-link>
            </h4>
        </v-toolbar>
        <v-container>
            <v-row dense>
                <v-col v-for="(vod, i) in videos" :key="i" cols="4" md="3" lg="2">
                    <video-card v-bind="vod"/>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
import * as dayjs from 'dayjs';
import axios from 'axios';
import VideoCard from './VideoCard';
import {Formatter, Paging, API} from '@/shared';

/**
 * @see https://cn.vuejs.org/v2/guide/components-props.html
 */
export default {
    name: 'VideoPanel',
    components: {VideoCard},
    props: {
        title: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        }
    },
    data: () => ({
        videos: []
    }),
    mounted() {
        const params = {
            page: Paging.PAGE,
            pageSize: Paging.PAGE_SIZE,
            type: this.type
        };
        axios.get(API.VIDEOS, {params}).then(res => {
            this.videos = res.data.items.map(item => ({
                vid: item.id,
                poster: item.poster,
                posterThumb: item.posterThumb,
                title: item.altTitle,
                subtitle: dayjs(item.createdAt).format(Formatter.DATE)
            }));
        });
    }
};
</script>