<template>
    <v-container>
        <v-row dense>
            <v-col cols="12">
                <v-card outlined>
                    <v-toolbar dense flat class="grey lighten-3">
                        <h4 class="font-weight-medium">共检索到 <span class="red--text text--darken-3">{{rows}}</span> 条结果</h4>
                        <v-spacer/>
                        <a class="v-link text-small" @click="expand=!expand">
                            {{expand?'收起':'展开'}}<v-icon small>{{expand?'keyboard_arrow_up':'keyboard_arrow_down'}}</v-icon>
                        </a>
                    </v-toolbar>
                    <v-card-text :class="[{'d-none': !expand}]">
                        <p class="mb-0">
                            <label>按类型：</label>
                            <label v-for="genre in genres" :key="genre.value" :for="'genre-'+genre.value">
                                <input :id="'genre-'+genre.value" name="genre" type="radio"> {{genre.label}}
                            </label>
                        </p>
                        <p class="mb-0">
                            <label>按年份：</label>
                            <label v-for="year in years" :key="year" :for="'year-'+year">
                                <input :id="'year-'+year" name="year" type="radio"> {{year}}
                            </label>
                        </p>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12">
                <v-row dense>
                    <v-col v-for="(video, i) in videos" :key="i" cols="4" md="3" lg="2" class="py-2">
                        <v-card outlined>
                            <v-hover v-slot:default="{ hover }">
                                <v-img :src="require(`@/assets/img/${video.poster}`)">
                                    <v-expand-transition>
                                        <div class="d-flex transition-fast-in-fast-out grey darken-3 v-card--reveal"
                                             v-if="hover">
                                            <v-btn icon class="white--text" to="/video/play" target="_blank">
                                                <v-icon x-large>play_circle_outline</v-icon>
                                            </v-btn>
                                        </div>
                                    </v-expand-transition>
                                </v-img>
                            </v-hover>
                            <v-card-text class="text-center py-1">
                                <p class="mb-0">
                                    <router-link class="subtitle-1 v-link" to="/video/detail">{{video.title}}</router-link>
                                </p>
                                <p class="mb-0">
                                    <span class="subtitle-2">{{video.createdAt}}</span>
                                </p>
                            </v-card-text>
                        </v-card>
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
export default {
    name: 'VideoList',
    data: () => ({
        page: 1,
        rows: 15,
        expand: false,
        years: require('@/data/years.json'),
        videos: require('@/data/videos.json'),
        genres: require('@/data/genres.json')['movie'],
    }),
};
</script>