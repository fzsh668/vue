<template>
    <div class="set">
        <div class="nav">
            <Navbar :head_title="head_title"></Navbar>
        </div>
        <div class="head">
            <van-icon name="user-o" size="40px" color="#7e8c8d"/>
            <ul>
                <li><span>姓名:</span><span>{{user.name}}</span></li>
                <li><span>职业:</span><span>{{user.work}}·{{user.gov}}</span></li>
                <li><span>区域:</span><span>{{user.area}}</span></li>
            </ul>
        </div>
        <div class="lists">
            <div class="list">
                <ul>
                    <li  @click="go('/index/source')">
                        <span>我的资源</span>
                        <span>></span>
                    </li>
                    <li  @click="go('/index/reward')">
                        <span>我的奖励</span>
                        <span>></span>
                    </li>
                    <li  @click="go('/set/mycost')">
                        <span>我的餐费</span>
                        <span>></span>
                    </li>
                    <li  @click="go('/set/updatauser')">
                        <span>修改信息</span>
                        <span>></span>
                    </li>
                    <li  @click="loginout">
                        <span>退出登陆</span>
                        <span>></span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="footer">
            <Tabbar></Tabbar>
        </div>
    </div>
</template>

<script>
import Navbar from '../../components/component/Navbar';
import Tabbar from '../../components/component/Tabbar';
import {getUser} from "../../utils/auth";
export default {
    data(){
        return{
            head_title:'设置',
            user:{},
        }
    },
    components:{
        Tabbar,
        Navbar,
    },
    methods:{
        loginout(){
            this.$store.dispatch('logout');
        },
        go(v){
                this.$router.push({
                    path:v,
                    query:{
                         id:this.id,
                    }
                });
        }
    },
    computed:{
    },
    created(){
       this.$store.dispatch('getInfo').then(()=>{
         this.user = this.$store.state.user;
         this.id =this.$store.state.user.id;
       })
    }
}
</script>

<style scoped lang="less" type="text/less">
    .set{
        height: 100%;
        .head{
            margin-top: 6%;
            padding: 0 10px;
            ul{
                li{
                    display: flex;
                    display: -webkit-flex;
                    justify-content: center;
                    margin-top: 0.1rem;
                    align-items: center;
                    span{
                        color: #7e8c8d;
                        font-size: 14px;
                        margin-right: 0.5rem;
                    }
                    span:first-child{
                        flex: 0 0 40%;
                        text-align: right;
                    }
                    span:last-child{
                        flex: 1;
                        text-align: left;
                    }
                }
            }
        }
        .lists{
            padding: 0 8%;
            margin-top: 1rem;
            .list{
                width: 100%;
                font-size: 14px;
                ul{
                    li{
                        display: flex;
                        color:#7e8c8d;
                        justify-content: space-between;
                        padding: 10px 0;
                        border-bottom: 1px solid rgba(146, 142, 142, 0.3);
                        span{
                        }
                    };
                }
            }
        }
    }
</style>