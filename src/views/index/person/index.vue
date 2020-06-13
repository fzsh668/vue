<template>
    <div class="person">
        <div class="head">
            <Header></Header>
        </div>
        <div class="loading" v-show="loading==true">
            <van-loading size="24px">加载中...</van-loading>
        </div>

        <div class="lists">
            <div class="head"><p>总人数<span>{{count}}</span></p></div>
            <ul>

                <li v-for="item in lists">
                    <div class="list">
                        <div class="left">
                            <div><van-icon name="user-o" size="30px"/></div>
                            <div>
                                <h5><span>{{item.username}}</span><span>{{item.name}}</span></h5>
                                <p><span>{{item.dept}}</span><span>{{item.work}}</span><span>{{item.gov}}</span></p>
                            </div>
                        </div>
                        <div class="right">{{item.area}}</div>
                    </div>
                </li>
                <li>
                    <van-pagination v-model="currentPage" :page-count="pagecount" mode="simple" @change="changePage"/>
                </li>
            </ul>
        </div>
        <div class="footer">
            <Tabbar></Tabbar>
        </div>
    </div>
</template>

<script>
import Header from '../../../components/component/Header';
import Tabbar from '../../../components/component/Tabbar';
import {ApiGetPerson} from '@/Api/main';
export default {
    data(){
        return{
            loading:true,
            lists:[],
            count:0,
            pagecount:0,
            currentPage:1,
            pagesize:4,
        }
    },
    methods:{
        changePage(){
            this.getUsers();

        },
        getUsers(){
            this.loading = true;
            ApiGetPerson({
                currentPage:this.currentPage,
                pagesize:this.pagesize,
            }).then(res=> {
                    this.lists = res.data.data;
                    this.count=res.data.count;
                    this.pagecount=Math.ceil(this.count/this.pagesize);
                    this.loading=false;
            })
        }
    },
    components:{
        Header,
        Tabbar
    },
    created(){
       this.getUsers();
    }
}
</script>

<style scoped lang="less" type="text/less">
    .person{
        width: 100%;
        height: 100%;
        overflow: hidden;
        .loading{
            width: 100%;
            height: 100%;
            padding-top:  30px;
            text-align: center;
        }
        .lists{
            width: 90%;
            margin: 0 auto;
            overflow: hidden;
            padding-bottom: 3rem;
            overflow-y: scroll;
            .head{
                text-align: left;
                margin-top: 10px;
            }
            .list{
                width: 100%;
                margin: 0 auto;
                display: flex;
                display: -webkit-flex;
                justify-content: space-between;
                border-bottom: 1px solid rgba(146, 142, 142, 0.3);
                padding: 5% 0;
                .left{
                    display:flex;
                    align-items: center;
                    justify-content: center;
                    div{
                        margin-right: 5px;
                        text-align: left;
                    }
                    h5{
                        span{
                            margin-right: 5px;
                            font-size: 12px;
                            text-align: left;
                        }
                    }
                    p{
                        span{
                            margin-right: 5px;
                        }
                    }
                }
                .right{

                }
            }
            .bom{
                margin-top: 0.5rem;
                .van-pagination{
                    font-size: 0.4rem;
                    color: rgba(146, 142, 142,1);
                }
            }
        }
    }
</style>