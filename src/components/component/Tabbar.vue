<template>
    <div class="tabbar">
        <van-tabbar v-model="active" @change="onChange">
            <van-tabbar-item replace to="/index" icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item replace to="/search" icon="search">搜索</van-tabbar-item>
            <van-tabbar-item replace to="/statistics" icon="friends-o">统计</van-tabbar-item>
            <van-tabbar-item replace to="/set" icon="setting-o">设置</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
    data(){
        return {
            active: 0,
        };
    },
    methods:{
        onChange(index) {
            this.active=index;

        },
        tabbarActive(){
            let $route=['/index','/search','/statistics','/set']
            let rel = this.$route.path
            this.active=$route.indexOf(rel);
        }
    },
    mounted(){

    },
    created(){
        this.tabbarActive();
    }
}
</script>

<style scoped lang="less" type="text/less">
.tabbar{
    height: 3rem;
    position: absolute;
    .van-tabbar-item--active{
        color: #84B527;
    }
}
</style>