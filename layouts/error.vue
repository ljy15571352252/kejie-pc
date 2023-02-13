<template>
    <div>
        <div v-if="error.statusCode === 404" class="error404">
            <p>sorry,你要访问的页面不见了</p>
            <nuxt-link to="/">返回首页</nuxt-link>

        </div>
        <div v-else class="error404">
            <p> 500 - 服务器错误</p>
            <div>
                <nuxt-link to="/">返回首页</nuxt-link>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "error",
        props:['error'],
        layout:'default',
        data() {
            return {}
        },
        watch: {},
        computed: {},
        methods: {},
        created() {

        },
        mounted() {

        }
    }
</script>

<style scoped lang="less">
    .error404{
        width: 1920px;
        height: 1080px;
        background: url(../static/images/error/404.png) no-repeat center;
        position: relative;
        p,a{
            position: absolute;
            top: 680px;
            left: 50%;
            font-size: 25px;
            color: #333;
            transform: translateX(-50%);
            z-index: 9;
        }
        a{
            top: 770px;
            display: block;
            width: 200px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            border-radius: 25px;
            background: #e9eaea;
        }
    }

</style>
