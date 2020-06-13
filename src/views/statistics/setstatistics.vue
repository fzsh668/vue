<template>
    <div class="main">
        <div class="head">
            <Navbar :head_title="head_title"></Navbar>
        </div>
        <div class="lists">
            <div class="list">
                <van-field v-model="maxrecord" label="资源目标" type="number" placeholder="请设置资源目标" />
                <van-field v-model="maxphone" label="留电目标" type="number" placeholder="请设置留电目标" />
                <van-field v-model="maxach" label="业绩目标" type="number" placeholder="请设置业绩目标" />
                <van-field v-model="month" label="当前月份" readonly/>
            </div>
            <van-button type="info" @click="goresult">信息按钮</van-button>
        </div>
    </div>
</template>
<script>
import Navbar from '../../components/component/Navbar';
import {ApiSetstatistics} from '@/Api/statistics';
export default {
    data(){
        return{
            head_title:'目标值设置',
            maxrecord:'',
            maxphone:'',
            maxach:'',
            month:'',
        }
    },
    methods:{
        goresult() {
            let max = {
                maxrecord: this.maxrecord,
                maxphone: this.maxphone,
                maxach: this.maxach,
                month: this.month,
            }
            ApiSetstatistics(max).then(res => {
                this.$toast.success(res.data.msg);
                this.$router.go(-1);
            })
        }
    },
    components: {
        Navbar,
    },
    created() {
        this.month = this.$route.query.date;
    }

}
</script>
<style lang="less" type="text/less">
    .main{
        width: 100%;
        .lists{
            .list{
                padding-top: 5%;
                .van-cell{
                    margin: 5px 0;
                }
            }
            .van-button{
                margin-top: 10px;
            }
        }
    }
</style>