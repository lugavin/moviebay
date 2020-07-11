<template>
    <v-container>
        <valine/>
    </v-container>
</template>

<script>
import Valine from './Valine';

export default {
    name: 'CommentList',
    components: {Valine}
};
</script>
