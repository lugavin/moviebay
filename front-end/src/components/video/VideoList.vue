<template>
    <v-container>
        <v-row dense>
            <v-col cols="12">
                <v-card outlined>
                    <v-toolbar dense flat class="grey lighten-3">
                        <h4 class="font-weight-medium">共检索到 <span class="red--text text--darken-3">{{rows}}</span> 条结果</h4>
                        <v-spacer/>
                        <a class="v-link" @click="expand=!expand">
                            <small>{{expand?'收起':'展开'}}</small>
                            <v-icon small>{{expand?'keyboard_arrow_up':'keyboard_arrow_down'}}</v-icon>
                        </a>
                    </v-toolbar>
                    <v-container :class="{'d-none': !expand}">
                        <v-row dense>
                            <v-col cols="12">
                                <ul class="pl-0">
                                    <li class="d-block float-left">按类型：</li>
                                    <li class="d-block float-left mx-1" v-for="genre in genres" :key="genre.value">
                                        <label :for="'genre-'+genre.value">
                                            <input :id="'genre-'+genre.value" name="genre" type="radio"> {{genre.label}}
                                        </label>
                                    </li>
                                </ul>
                            </v-col>
                            <v-col cols="12">
                                <ul class="pl-0">
                                    <li class="d-block float-left">按年份：</li>
                                    <li class="d-block float-left mx-1" v-for="year in years" :key="year">
                                        <label :for="'year-'+year">
                                            <input :id="'year-'+year" name="year" type="radio"> {{year}}
                                        </label>
                                    </li>
                                </ul>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-col>
            <v-col cols="12">
                <v-row dense>
                    <v-col v-for="(video, i) in videos" :key="i" cols="4" md="3" lg="2" class="py-2">
                        <v-card>
                            <v-hover v-slot:default="{ hover }">
                                <v-img :src="require(`@/assets/img/${video.poster}`)" max-width="360" max-height="480">
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
                                <div class="subtitle-1">
                                    <router-link class="v-link" to="/video/detail">{{video.title}}</router-link>
                                </div>
                                <div class="subtitle-2">{{video.createdAt}}</div>
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