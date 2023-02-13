<template>
    <div>
        <c-header/>
        <div class="clear"></div>
        <nuxt/>
        <c-footer/>
    </div>
</template>

<script>
    import CFooter from '../components/footer'
    import CHeader from '../components/header'
    export default {
        name: "default",
        head: {},
        data() {
            return {

            }
        },
        watch: {},
        components: {CFooter,CHeader},
        computed: {

        },
        methods: {

        },
        created() {

        },
        mounted() {
        }
    }
</script>

<style scoped lang="less">

</style>
