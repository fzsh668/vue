<template>
    <van-nav-bar
            :title="head_title"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
    >
        <template #right>
            <van-icon name="wap-home-o" size="22" @click="goHome"/>
        </template>
    </van-nav-bar>
</template>

<script>
export default {
   data(){
       return{

    
       }
   },
    props:['head_title'],
    methods:{
        onClickLeft(){
            this.$router.go(-1);
        },
        onClickRight(){},
        goHome(){
            this.$router.push('/index');
        }

    },
    created(){

    }
}
</script>

<style scoped lang="less" type="text/less">
   .van-nav-bar{
       /deep/.van-icon {
           color: #5a5e66;
       }
       /deep/ .van-nav-bar__text{
            color: #5a5e66;
        }

    }

</style>