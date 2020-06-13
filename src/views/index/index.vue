<template>
    <div class="index">
        <div class="head">
            <Header></Header>
        </div>
        <div class="mid">
            <div v-for="(item,index) in icons" :key="index" class="mids">
                <router-link :to="item.r">
                    <div>
                        <van-icon :name="item.n" size="32" color="#84b527"/>
                        <p>{{item.i}}</p>
                    </div>
                </router-link>
            </div>
        </div>
        <div class="midbottom">
            <p>
                大麦集团版权所有
            </p>
        </div>
        <div class="foot">
            <Tabbar></Tabbar>
        </div>
    </div>
</template>

<script>
import Header from '../../components/component/Header';
import Tabbar from '../../components/component/Tabbar';
export default {
    data(){
        return{
            icons:[
                {
                    n:'friends-o',
                    i:'人员组织',
                    r:'/index/person'
                },
                {
                    n:'cart-o',
                    i:'资源',
                    r:'/index/source'
                },
                {
                    n:'point-gift-o',
                    i:'奖励',
                    r:'/index/reward'
                },
                {
                    n:'records',
                    i:'资源录入',
                    r:'/index/record'
                },
                {
                    n:'phone-o',
                    i:'留电',
                    r:'/index/phone/index'
                },
                {
                    n:'question-o',
                    i:'签到',
                    r:'/index/sign'
                }
            ]
        }
    },
    components:{
        Tabbar,
        Header
    },
    created() {

    }
}
</script>

<style lang="less" scoped  type="text/less">
    .index{
        width: 100%;
        height: 100%;
        .head{
            width: 100%;
            display: block;
            img{
                width: 100%;
            }
        }
        .mid{
            width: 80%;
            margin: 0 auto;
            padding-top: 6%;
            display: flex;
            display: -webkit-flex;
            flex-wrap: wrap;
            justify-content: space-between;
            .mids{
                flex:0 0  45%;
                margin-top: 10px;
              /*  background: -moz-linear-gradient(left, #8cc0f1 0%, #ffffff 50%, #8cc0f1 100%);
                background: -webkit-linear-gradient(left, #8cc0f1 0%, #ffffff 50%, #8cc0f1 100%);
                background: -o-linear-gradient(left, #8cc0f1 0%, #ffffff 50%, #8cc0f1 100%);
                background: -ms-linear-gradient(left, #8cc0f1 0%, #ffffff 50%, #8cc0f1 100%);
                background: linear-gradient(left, #8cc0f1 0%, #ffffff 50%, #8cc0f1 100%);*/
                background: #DDF1E6;
                div{
                   // border: 1px solid #5a5e66;
                    padding: 8px 0;
                }
            }
        }
        .midbottom{
            width: 100%;
            position: absolute;
            bottom: 60px;
            text-align: center;
            p{
                color: #84b527;
            }
        }
    }
</style>