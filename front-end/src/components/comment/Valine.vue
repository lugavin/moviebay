<template>
    <div id="comments"></div>
</template>

<script>
import Valine from 'valine';

export default {
    name: 'Valine',
    mounted() {
        new Valine(Object.assign({el: '#comments'}, require('@/data/valine.json')));
    }
};
</script>

<style>
#comments > .vpower {
    display: none;
}
</style>
