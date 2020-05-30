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
import VideoCard from '@/components/shared/VideoCard';
import {Formatter, Paging, API} from '@/components/util/consts';

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
            page: Paging.page,
            pageSize: Paging.pageSize,
            type: this.type
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
    }
};
</script>