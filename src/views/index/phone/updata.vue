<template>
    <div class="main">
        <div>
            <Navbar :head_title="head_title"></Navbar>
        </div>
        <div class="loading" v-show="loading">
            <van-loading size="24px">加载中...</van-loading>
        </div>
        <div class="lists" v-show="loading==false">
            <ul>
                <li>
                    <span>姓名</span>
                    <input type="text" v-model="infos.name" autofocus="autofocus">
                </li>
                <li>
                    <span>年龄</span>
                    <input type="text" v-model="infos.age">
                </li>
                <li>
                    <span>性别</span>
                    <input type="text" v-model="infos.sex==1?'男':'女'">
                </li>
                <li>
                    <span>地址</span>
                    <input type="text" v-model="infos.address">
                </li>
                <li>
                    <span>来源</span>
                    <input type="text" v-model="infos.origin">
                </li>
                <li>
                    <span>电话</span>
                    <input type="text" v-model="infos.phone">
                </li>
                <li>
                    <span>日期</span>
                    <input type="text" v-model="infos.date">
                </li>
                <li>
                    <span>说明</span>
                    <input type="text" v-model="infos.explain">
                </li>
            </ul>
            <van-button type="default" @click="updates">提交</van-button>
        </div>
    </div>
</template>

<script>
import {ApiPhoneEdit} from '@/Api/main';
import Navbar from '../../../components/component/Navbar';
export default {
    data(){
        return{
            infos:[],
            date:'',
            loading:false,
            head_title:'资源详情',
        }
    },
    components:{
        Navbar,
    },
    methods:{
        updates(){
            ApiPhoneEdit(this.infos).then(res=>{
                    this.$toast.success('更新成功');
                    this.$router.push('/index/phone');
            })
        },
        getTime:function(){
            var _this = this;
            let yy = new Date().getFullYear();
            let mm = new Date().getMonth()+1;
            let dd = new Date().getDate();
            let hh = new Date().getHours();
            let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
            let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
            this.date = yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;

        },
    },
    created(){
        this.getTime();
        let phone=this.$route.query.user;
        this.infos = JSON.parse(phone);

    }

}
</script>

<style scoped lang="less" type="text/less">
    .main{
        width: 100%;
        height: 100%;
        .loading{
            margin-top: 30%;
            text-align: center;
        }
        .lists{
            padding: 0 8%;
            padding-top: 20px;
            ul{
                li{
                    display: flex;
                    display: -webkit-flex;
                    border-bottom:1px solid rgba(146, 142, 142, 0.3);
                    padding: 8px 0;
                    span{
                        flex: 0 0 20%;
                        text-align: left;
                        letter-spacing: 2px;
                        font-size: 14px;
                        color: #5a5e66;
                    }
                    input{
                        border: none;
                        outline: none;

                    }
                }
            }
            .van-button{
                margin-top: 20px;
            }
        }
    }

</style>