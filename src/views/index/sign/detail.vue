<template>
    <div class="signDetail">
        <div class="head">
            <Navbar :head_title="head_title"></Navbar>
        </div>
        <div class="lists">
            <div class="head">
                <p><span>当前月份 : </span><span>{{monthdate}}</span></p>
                <p><span>总数目 : </span><span>{{count}}</span></p>
            </div>
            <div v-show="loading" class="loading">
                <van-loading size="24px">加载中...</van-loading>
            </div>
            <div class="list" v-show="loading==false" >
                <ul class="u1">
                    <li v-for="(item,index) in list" :key="index">
                        <div class="first">
                            <span>{{index+1}}</span><span>{{item.name}}</span>
                            <span>{{item.date}}</span><span>{{item.cost}} 元</span>
                        </div>
                    </li>
                </ul>
                    <van-pagination
                            v-model="currentPage"
                            :page-count="pageCount"
                            :items-per-page="itemsPage"
                            mode="simple"
                            @change="change"
                    />
            </div>
        </div>
    </div>
</template>
<script>
import {ApiSignDetail} from "@/Api/main"
import Navbar from '../../../components/component/Navbar';
export default {
    data() {
        return {
            head_title:'签到详情',
            list:[],
            monthdate:'',
            loading:true,
            id:'',
            currentPage:1,
            pageCount:0,
            itemsPage:6,
            count:0,
        }
    },
    components:{
        Navbar
    },
    methods:{
        getDetail(){
            ApiSignDetail({
                id:this.id,
                monthdate:this.monthdate,
                currentPage:this.currentPage,
                itemsPage:this.itemsPage,
            }).then(res=>{
                this.list = res.data.data;
                this.pageCount = Math.ceil(res.data.count/this.itemsPage);
                this.count = res.data.count;
                this.loading=false;
                console.log('this.list',res);
            }) .catch(() => {
                this.loading = false;
            });

        },
        change(){
            this.loading=true;
            this.getDetail();
        }
    },
    created() {
        let date = new Date();
        this.monthdate = date.getFullYear()+'-'+(date.getMonth()+1>10?date.getMonth()+1:'0'+(date.getMonth()+1));
        this.id = this.$route.query.id;
        this.getDetail();
    }
}
</script>
<style scoped lang="less" type="text/less">
    .signDetail{
        width:100%;
        .lists{
            overflow-y: scroll;
            padding: 0 10%;
            .head{
                display: flex;
                display: -webkit-flex;
                justify-content: space-between;
                border-bottom: 1px solid rgba(146, 142, 142, 0.3);
                padding: 5% 0;
                p{
                    span{
                        font-size: 14px;
                    }
                }
            }
            .loading{
                margin-top: 15%;
            }
            .list{
                .u1{
                    li {
                        padding: 15px 0;
                        border-bottom: 1px solid rgba(146, 142, 142, 0.3);
                        div{
                            width: 100%;
                            display: flex;
                            display: -webkit-flex;
                            align-items: center;
                            text-align: left;
                            span{
                                display: block;
                                flex: auto;
                                font-size: 14px;
                            }
                            span:last-child{
                                color: #2ac845;
                                text-align: right;
                            }
                        }
                    }
                }
            }
        }

    }
</style>