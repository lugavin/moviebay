<template>
    <v-card-text class="text-center py-1">
        <p class="mb-0">
            <router-link class="subtitle-1 v-link" :to="`/video/detail/${vid}`" v-text="title"/>
        </p>
        <p class="mb-0">
            <span class="subtitle-2" v-text="subtitle"/>
        </p>
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
        },
    },
};
</script>

