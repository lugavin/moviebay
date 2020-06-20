<template>
    <v-container>
        <v-row dense>
            <v-col cols="12">
                <v-card outlined>
                    <v-toolbar dense flat class="grey lighten-3">
                        <h4 class="font-weight-medium">共检索到 <span class="red--text text--darken-3">{{totalItems}}</span> 条结果</h4>
                        <v-spacer/>
                        <a class="v-link text-small" @click="expand=!expand">
                            筛选<v-icon small>{{expand?'keyboard_arrow_up':'keyboard_arrow_down'}}</v-icon>
                        </a>
                    </v-toolbar>
                    <v-card-text :class="[{'d-none': !expand}, 'py-2']">
                        <v-chip-group column color="indigo" v-model="filter.countries" @change="getPage">
                            <v-chip v-for="{value, label} in filters.countries" :key="value" :value="value" label outlined filter>
                                {{label}}
                            </v-chip>
                        </v-chip-group>
                        <v-chip-group column color="indigo" v-model="filter.sort" @change="getPage">
                            <v-chip v-for="{value, label} in filters.sorts" :key="value" :value="value" label outlined filter>
                                {{label}}
                            </v-chip>
                        </v-chip-group>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12">
                <v-row dense>
                    <v-col v-for="(video, i) in videos" :key="i" cols="4" md="3" lg="2" class="py-2">
                        <video-card v-bind="video"/>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12">
                <v-pagination v-model="paging.page" :length="totalPages" :total-visible="7" @input="getPage"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';
import * as dayjs from 'dayjs';
import {API, Paging, VodType, Formatter} from '@/shared';
import {VideoCard} from '@/components/video';

export default {
    name: 'SeriesList',
    components: {VideoCard},
    data: () => ({
        paging: {
            page: Paging.PAGE,
            pageSize: Paging.PAGE_SIZE
        },
        totalItems: 0,
        totalPages: 0,
        expand: false,
        videos: [],
        filters: require('@/data/filters.json'),
        filter: {
            countries: null,
            sort: null
        }
    }),
    watch: {
        type() {
            this.getPage();
        }
    },
    methods: {
        getPage() {
            const params = Object.assign({type: VodType.SERIES}, this.paging, this.filter);
            axios.get(API.VIDEOS, {params}).then(res => {
                this.totalItems = res.data.totalItems;
                this.totalPages = res.data.totalPages;
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
    },
    mounted() {
        this.getPage();
    }
};
</script>
