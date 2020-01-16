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
                <v-pagination v-model="page" :length="rows" :total-visible="7"></v-pagination>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import VideoCard from '@/components/shared/VideoCard';
import axios from 'axios';

export default {
    name: 'VideoSearch',
    components: {VideoCard},
    props: {
        keyword: {
            type: String,
            required: true
        },
    },
    data: () => ({
        page: 1,
        rows: 15,
        videos: [],
    }),
    mounted() {
        axios.get(`/api/videos/search?q=${this.keyword}`).then(res => {
            this.videos = res.data.map(item => ({
                vid: item.id,
                poster: item.poster,
                title: item.title,
                subtitle: item.createdAt,
            }));
        });
    },
};
</script>
