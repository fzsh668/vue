<template>
    <div>
        <div class="head">
            <Navbar :head_title="head"></Navbar>
        </div>
        <van-empty description="敬请期待" />
    </div>

</template>

<script>
import Navbar from '../../../components/component/Navbar';
export default {
    data(){
        return{
            head:'奖励'
        }
    },
    components:{
        Navbar,
    }
}
</script>

<style scoped>

</style>