<template>
    <div class="source">
        <div class="header">
            <Navbar :head_title="title"></Navbar>
        </div>
        <div class="loading" v-show="loading==true">
            <van-loading size="24px">加载中...</van-loading>
        </div>
        <div v-show="issource">
            <van-empty description="空" />
        </div>
        <div class="lists" v-show="loading==false">
            <div class="head">
                <div> <p>资源总数:<span>{{count}}</span></p></div>
            </div>
            <div v-for="item in sources" class="list">
                <div class="first_div">
                    <van-contact-card type="edit" :name="item.name" :tel="item.tel" :editable="false" />
                </div>
                <div class="last_div">
                    <button @click="goto(item)">查看</button>
                </div>
            </div>
            <van-pagination v-model="currentPage" :page-count="pagecount" mode="simple" @change="change"/>
        </div>
    </div>
</template>

<script>
//import {Api} from '../../../Api';
//import Header from '../../component/Header';
import Navbar from '../../../components/component/Navbar';
import {ApiGetSource} from '@/Api/main';
export default {
    data(){
        return{
            issource:false,
            count:0,
            sources:[],
            date:'',
            status:'',
            title:'资源',
            loading:true,
            currentPage:1,
            pagesize:4,
            pagecount:0,
            uid:0,
        }
    },
    components:{
        Navbar,
    },
    methods:{
        getSource(){
            this.loading=true;
            if(this.uid){
                ApiGetSource({
                    currentPage:this.currentPage,
                    pagesize:this.pagesize,
                    id:this.uid
                }).then(res=>{
                    this.loading=false;
                    if(res.data.count==0){
                        this.issource=true;
                    }else{
                        this.count = res.data.count;
                        this.pagecount=Math.ceil(res.data.count/this.pagesize);
                        this.sources=res.data.data;
                        this.issource=false;
                        //this.loading=false;
                    }
                })
            }else{
                ApiGetSource({
                    currentPage:this.currentPage,
                    pagesize:this.pagesize,
                }).then(res=>{
                    this.loading=false;
                    if(res.data.count==0){
                        this.issource=true;
                    }else{
                        this.count = res.data.count;
                        this.pagecount=Math.ceil(res.data.count/this.pagesize);
                        this.sources=res.data.data;
                        this.issource=false;
                        //this.loading=false;
                    }
                })
            }
        },
        change(){
            //console.log(this.currentPage);
            this.getSource();
        },
        getselect(){
            let v=this.ops[this.opsSelected];
        },
        getSources(){

        },
        goto(v){
            this.$router.push({
                path:'/index/source/sourceDetail',
                query:{
                    'courceItem':JSON.stringify(v),
                }
            })
        }
    },
    created(){
        if(this.$route.query.id){
            this.uid = this.$route.query.id;
        }
        this.getSource();
      //  this.opsSelected = this.ops[0].id;
    }
}
</script>

<style scoped lang="less" type="text/less">
    .source{
        width: 100%;
        .loading{
            margin-top: 15%;
        }
        .lists{
            display: block;
            padding: 0 5%;
            .head{
                width: 100%;
                text-align: left;
                padding: 10px 0 5px 0;
                font-size: 14px;
                border-bottom:1px solid rgba(146, 142, 142, 0.5);
                display: flex;
                display: -webkit-flex;
                align-items: center;
                div{
                    flex: 1;
                    text-align: left;
                    span{
                        margin-left: 8px;
                    }
                }
                select{
                    border: none;
                    margin-left: 8px;
                }

            }
            .list{
                width: 100%;
                padding: 10px 0;
                text-align: left;
                display: flex;
                display: -webkit-flex;
                border-bottom:1px solid rgba(146, 142, 142, 0.5);
                justify-content: space-between;
                align-items: center;
                position: relative;
                .first_div{
                    width: 100%;
                }
                .last_div{
                    position: absolute;
                    right:5px;
                    button{
                        border: none;
                        outline: none;
                        background: none;
                        color: #84b527;
                    }
                }
            }
        }
    }
</style>