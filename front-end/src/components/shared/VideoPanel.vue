<template>
    <v-card outlined>
        <v-toolbar dense flat class="grey lighten-4">
            <h4 class="font-weight-medium">
                <router-link class="v-link" :to="url">{{title}}</router-link>
            </h4>
            <v-spacer/>
            <slot name="tags"/>
        </v-toolbar>
        <slot/>
    </v-card>
</template>

<script>
/**
 * @see https://cn.vuejs.org/v2/guide/components-props.html
 */
export default {
    name: 'VideoPanel',
    props: {
        url: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
    },
}
</script>