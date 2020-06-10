<template>
    <v-container>
        <v-row>
            <!--
            <v-col cols="12">
                <v-carousel cycle hide-delimiters show-arrows-on-hover height="380">
                    <v-carousel-item v-for="(item, i) in posters" :key="i" :src="require(`@/assets/img/${item.poster}`)"/>
                </v-carousel>
            </v-col>
            -->
            <v-col cols="12">
                <video-panel v-bind="{title: '电影', type: 'movie'}"/>
            </v-col>
            <v-col cols="12">
                <video-panel v-bind="{title: '连续剧', type: 'series'}"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import {VideoPanel} from '@/components/shared';

/**
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API
 */
export default {
    name: 'Home',
    components: {VideoPanel},
    data: () => ({
        posters: []
    })
};
</script>
