<template>
    <div class="header">
        <van-swipe :autoplay="3000" :touchable="true">
            <van-swipe-item v-for="(image, index) in images" :key="index">
                <img :src="image"/>
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
export default {
   data(){
       return{
           images:[
               "../../../../static/images/lb/banner23.jpg",
               "../../../../static/images/lb/banner23.jpg",
           ],
       }
   }
}
</script>

<style scoped lang="less" type="text/less">
    .header{
        width: 100%;
        img{
            width: 100%;
            display: block;
        }
    }

</style>