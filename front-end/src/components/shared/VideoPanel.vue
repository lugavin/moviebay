<template>
    <v-card outlined>
        <v-toolbar dense flat class="grey lighten-4">
            <h4 class="font-weight-medium">{{title}}</h4>
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
        title: {
            type: String,
            required: true
        }
    }
}
</script>