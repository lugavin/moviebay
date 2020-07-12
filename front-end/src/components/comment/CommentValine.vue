<template>
    <div id="comments"></div>
</template>

<script>
import Valine from 'valine';

export default {
    name: 'CommentValine',
    mounted() {
        new Valine(Object.assign({el: '#comments'}, require('@/data/valine.json')));
    }
};
</script>

<style>
#comments > .vpower,
#comments > .vcount,
#comments > .vempty {
    display: none !important;
}
</style>
