<template>
    <v-container>
        <v-row dense>
            <v-col cols="12">
                <v-row dense>
                    <v-col v-for="(video, i) in videos" :key="i" cols="4" md="3" lg="2" class="py-2">
                        <v-lazy>
                            <video-card v-bind="video"/>
                        </v-lazy>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12">
                <v-pagination v-model="page" :length="totalPages" :total-visible="7" @input="getPage"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import {VideoCard} from '@/components/shared';
import {Formatter, Paging, API} from '@/components/util/consts';
import axios from 'axios';
import * as dayjs from 'dayjs';

export default {
    name: 'VideoSearch',
    components: {VideoCard},
    props: {
        keyword: {
            type: String,
            required: true
        }
    },
    data: () => ({
        page: Paging.page,
        pageSize: Paging.pageSize,
        totalPages: 0,
        videos: []
    }),
    methods: {
        getPage(page) {
            axios.get(`${API.videos}/search`, {
                params: {
                    page,
                    pageSize: this.pageSize,
                    q: this.keyword
                }
            }).then(res => {
                this.totalPages = res.data.totalPages;
                this.videos = res.data.items.map(item => ({
                    vid: item.id,
                    poster: item.poster,
                    posterThumb: item.posterThumb,
                    title: item.altTitle,
                    subtitle: dayjs(item.createdAt).format(Formatter.DATE)
                }));
            });
        }
    },
    mounted() {
        this.getPage(this.page);
    }
};
</script>
