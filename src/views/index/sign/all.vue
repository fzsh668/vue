<template>
    <div class="signAll">
        <div class="head">
            <Navbar :head_title="head_title"></Navbar>
        </div>
        <div v-show="loading" class="loading">
            <van-loading size="24px">加载中...</van-loading>
        </div>
        <div class="lists" v-show="loading==false">
            <div class="list_head">
                <p><span>当前月份 : </span><span>{{monthdate}}</span></p>
            </div>
            <div class="list">
                <ul>
                    <li>
                        <div class="first"><span>ID</span><span>姓名</span>
                            <span>当月日期</span><span>费用</span></div>
                    </li>
                    <li v-for="item in list">
                        <div class="first"><span>{{item.uid}}</span><span>{{item.name}}</span>
                        <span>{{monthdate}}</span><span>{{item.costs}} 元</span></div>
                        <div class="last">
                            <button @click="getDetail(item.uid)">详情</button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import {ApiAllsign} from "@/Api/main"
import Navbar from '../../../components/component/Navbar';
export default {
    data() {
        return {
            head_title:'全部签到',
            list:[],
            monthdate:'',
            loading:true,
        }
    },
    components:{
      Navbar
    },
    methods:{
        getALLsign(){
            let date = new Date();
           this.monthdate = date.getFullYear()+'-'+(date.getMonth()+1>10?date.getMonth()+1:'0'+(date.getMonth()+1));
            ApiAllsign({
                'monthdate':this.monthdate ,
            }).then(res=>{
                this.list = res.data.data;
                this.loading=false;
                console.log('this.list',this.list);
            }).catch(()=>{
                this.loading=false;
            })

        },
        getDetail(id){
            console.log('id',id);
            this.$router.push({
                path:'/index/sign/detail',
                query:{
                    id:id
                }
            })
        }
    },
    created() {
        this.getALLsign();
    }
}
</script>
<style scoped lang="less" type="text/less">
    .signAll{
        .loading{
            margin-top: 15%;
        }
        .head{
            padding: 3% 0;
            text-align: left;
        }
        .lists{
            padding: 2% 10%;
            .list_head{
                p{
                    text-align: left;
                    font-size: 16px;
                }
            }
            .list{
                ul{
                    li{
                      display: flex;
                        display: -webkit-flex;
                        justify-content: space-between;
                        border-bottom: 1px solid rgba(146, 142, 142, 0.3);
                        padding: 5% 0;
                        .first{
                            width: 70%;
                            text-align: left;
                            display: flex;
                            display: -webkit-flex;
                            align-items: center;
                            span{
                                flex: auto;
                                font-size: 14px;
                            }
                        }
                    }
                }
            }
            .last{
                button{
                    background: none;
                    border: none;
                    color: #2ac845;
                    font-size: 14px;
                }
            }
        }
    }
</style>