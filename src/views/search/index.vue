<template>
    <div class="main">
        <div class="head">
            <van-search
                    v-model="ser_v"
                    show-action
                    placeholder="请输入搜索手机号码"
                    @onSearch="onSearch"
            >
                <template #action>
                    <div @click="onSearch">确定</div>
                </template>
            </van-search>
        </div>
        <div class="loading" v-show="loading==true">
            <van-loading size="24px">加载中...</van-loading>
        </div>
        <div v-show="isempty== true">
            <van-empty description="没有数据" />
        </div>
        <div class="box" v-show="loading== false">
            <div class="lists">
                <div v-for="item in phones" class="list">
                    <div class="left">
                        <van-contact-card type="edit" :name="item.name" :tel="item.phone" :editable="false" />
                    </div>
                    <div class="last_div">
                        <button @click="goDetail(item)">详情</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <Tabbar></Tabbar>
        </div>
    </div>
</template>

<script>
//import {Api} from "../../../Api";
import {ApiSearch} from '@/Api/search';
import Tabbar from '../../components/component/Tabbar';
export default {
    data(){
        return{
            ser_v:'',
            searchHistoryList: [],
            searchHistoryLists:[],
            // 标记显示搜索历史
            showFlag: false,
            loadShow: false,
            value:'',
            isempty:false,
            loading:false,
            phones:[],
            showresource:false,
            history:true,
            value1: 0,
        }
    },
    methods:{
        onSearch(){
            this.loading=true;
            this.isempty=false;
            ApiSearch({
                'phone':this.ser_v
            }).then(res=>{
                this.loading=false;
               if(res.data.data.length==0){
                   this.isempty = true;
                   this.loading=false;
               }
                this.phones = res.data.data;
            })
            /*  this.loading=true;
              this.isempty=false;
              console.log('this.ser_v',this.ser_v);
              Api.Mobile_search({
                  'phone':this.ser_v
              }).then(res=>{
                  console.log('res',res);
                  if(res.data.code!=200){
                      this.$toast(res.data.code);
                  }else{
                      this.history = false;
                      if(res.data.data.length==0){
                          this.loading=false;
                          this.isempty=true;
                      }else{
                          this.loading=false;
                          this.isempty=false;
                          this.phones = res.data.data;
                          this.showresource=true;
                      }

                  }

              })*/

          },
        oncancel(){
            this.ser_v = '';

        },
        goDetail(v){
            this.$router.push({
                path:'/index/phonedetail',
                query:{
                    'user':JSON.stringify(v),
                }
            });
        },
    },
    components:{
        Tabbar
    },
    created(){

    }
}
</script>

<style scoped lang="less" type="text/less">
    @keyframes myfirst
    {
        0%   {height: 0;}
        100% {height: auto;}
    }

    @-webkit-keyframes myfirst /* Safari 与 Chrome */
    {
        0%   {height: 0;}
        100% {height: auto;}
    }
    .main{
        height: 100%;
        overflow: hidden;
        .head{
            width: 100%;
            height: 1.6rem;
            flex:0 0 10%;
            position: fixed;
            z-index: 99;
            top: 0;
            display: flex;
            display: -webkit-flex;
            justify-content: space-between;
            /deep/.van-search{
                flex: 1;
                padding: 10px 18px 0 18px;
            }
            button{
                flex: 0 0 15%;
                background: none;
                border: none;
                outline: none;
            }
        }
        .position_history{
            position:absolute;
            top: 1.6rem;
            bottom: 3rem;
            width: 75%;
            left: 18px;
            overflow-y: scroll;
            background-color:#fff;
            color: #000000;
            animation: myfirst 2s;
            -webkit-animation: myfirst 2s; /* Safari 与 Chrome */
            div{
                padding: 10px 0 10px 20px;
                font-size: 14px;
                letter-spacing: 5px;
                border-bottom: 1px solid #fff;
                text-align: left;
                p{
                    span:first-child{
                        color: red;
                        font-size: 14px;
                    }
                }
            }
        }
        .loading{
            width: 100%;
            text-align: center;
            position: absolute;
            top:20%;
        }
        .box{
            flex:1;
            overflow-y: scroll;
            margin-top: 1.6rem;
            .lists{
                margin-bottom: 3rem;
                padding: 0 20px;
                .list{
                    padding: 10px 0;
                    display: flex;
                    display: -webkit-flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid rgba(146, 142, 142, 0.3);
                    position: relative;
                    .last_div{
                        position: absolute;
                        right:5px;
                        button{
                            border: none;
                            outline: none;
                            background: none;
                            color: #2779FF;
                        }
                    }
                    .left{
                        width: 100%;
                        display: flex;
                        display: -webkit-flex;
                        text-align: left;
                        .van-icon{
                            margin-top: 6px;
                            margin-right: 10px;
                        }
                    }
                    .anniu{
                        button{
                            background: none;
                            border: none;
                            font-size: 14px;
                            color: #2b85e4;
                        }
                    }
                }

            }
        }

    }
</style>