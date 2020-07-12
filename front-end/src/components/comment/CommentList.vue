<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <comment-valine/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import CommentValine from './CommentValine';

export default {
    name: 'CommentList',
    components: {CommentValine}
};
</script>
