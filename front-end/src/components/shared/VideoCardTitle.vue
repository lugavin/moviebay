<template>
    <v-card-text class="text-center py-1">
        <p class="mb-0 subtitle-1 v-card--title">
            <router-link class="v-link" :to="`/video/detail/${vid}`" :title="title" v-text="title"/>
        </p>
        <p class="mb-0 subtitle-2" v-text="subtitle"/>
    </v-card-text>
</template>

<script>
export default {
    name: 'VideoCardTitle',
    props: {
        vid: {
            type: [Number, String],
            required: true
        },
        title: {
            type: String,
            required: true
        },
        subtitle: {
            type: String,
            required: true
        }
    }
};
</script>

<style>
.v-card--title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>