<template>

    <md-layout md-gutter>
        <md-layout :md-flex="15" md-column></md-layout>
        <md-layout md-column :md-flex="70"  md-flex-xsmall="100" :md-flex-medium="100">
            <articles url="/articles{/id}"></articles>
        </md-layout>
        <md-layout :md-flex="15" md-column></md-layout>
    </md-layout>

</template>

<script>
    import articles from "../articles/Articles"

    export default {
        components: {articles},
        methods: {

        },

    }
</script>

<style scoped>
    .md-column{
        margin-bottom: 13px;
        margin-top: 13px;
    }
</style>
