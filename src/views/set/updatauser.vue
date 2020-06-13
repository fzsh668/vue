<template>
    <div class="updataUser">
        <div class="head">
            <Navbar :head_title="head_title"></Navbar>
        </div>
        <div class="lists">
            <ul>
                <li>
                    <span>
                        用户 :
                    </span>
                    <input type="text" v-model="user.username">
                </li>
                <li>
                    <span>
                        姓名 :
                    </span>
                    <input type="text" v-model="user.name">
                </li>
                <li>
                    <span>
                        工种 :
                    </span>
                    <input type="text" v-model="user.work">
                </li>
                <li>
                    <span>
                        部门 :
                    </span>
                    <input type="text" v-model="user.dept">
                </li>
                <li>
                    <span>
                        官职 :
                    </span>
                    <input type="text" v-model="user.gov">
                </li>
                <li>
                    <span>
                        区域 :
                    </span>
                    <input type="text" v-model="user.area">
                </li>
            </ul>
            <van-button :loading="isload" type="primary" :loading-text="load_text" @click="updatauser">提交</van-button>
        </div>
    </div>
</template>
<script>
import Navbar from '../../components/component/Navbar';
import {ApiUpdataUser} from '@/Api/set';
export default {
    data() {
        return {
            head_title:'修改信息',
            user:{},
            load_text:'加载中...',
            isload:false,
        }
    },
    components:{
        Navbar,
    },
    methods:{
        updatauser(){
            ApiUpdataUser({
                id:this.user.id,
                user:{
                    username:this.user.username,
                    name:this.user.name,
                    work:this.user.work,
                    dept:this.user.dept,
                    gov:this.user.gov,
                    area:this.user.area,
                }
            }).then(res=>{
                this.$toast.success('更新成功');
                this.$router.push('/set');
            })
        }
    },
    created() {
        this.$store.dispatch('getInfo').then(()=>{
            this.user = this.$store.state.user;
        })
    }
}
</script>
<style scoped lang="less" type="text/less">
    .updataUser{
        .lists{
            padding: 0 10%;
            margin-top: 5%;
            ul{
                li{
                    padding: 4% 0;
                    border-bottom: 1px solid rgba(146, 142, 142, 0.3);
                    display: flex;
                    display: -webkit-flex;
                    justify-content: space-between;
                    color: #7e8c8d;
                    font-size: 14px;
                    input{
                        border: none;
                        outline: none;
                    }
                }
            }
            .van-button{
                width: 46%;
                margin-top: 8%;
            }
        }
    }
</style>