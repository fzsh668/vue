<template>
    <div class="register">
        <div class="head">
            <Navbar :head_title="head_title"></Navbar>
        </div>
        <div class="main">
            <van-form validate-first>
                <!-- 通过 pattern 进行正则校验 -->
                <van-field
                        v-model="username"
                        name="username"
                        label="用户名"
                        placeholder="用户名"
                />
                <!-- 通过 validator 进行异步函数校验 -->
                <van-field
                        v-model="password"
                        name="password"
                        label="密码"
                        placeholder="请填写6位数密码"
                        type="password"
                />
                <van-field
                        v-model="password2"
                        name="password"
                        label="密码确认"
                        placeholder="密码确认"
                        type="password"
                />
                <van-field
                        v-model="name"
                        name="name"
                        label="姓名"
                        placeholder="姓名"
                />
                <van-field
                        v-model="area"
                        name="area"
                        label="区域"
                        placeholder="区域"
                        @click="getMyinfo(0)"
                />
                <van-field
                        v-model="dept"
                        name="dept"
                        label="部门"
                        placeholder="部门"
                        @click="getMyinfo(1)"
                />
                <van-field
                        v-model="work"
                        name="work"
                        label="职位"
                        placeholder="职位"
                        @click="getMyinfo(2)"
                />
                <van-field
                        v-model="gov"
                        name="gov"
                        label="官职"
                        placeholder="官职"
                        @click="getMyinfo(3)"
                />
                <div style=" padding-top: 20px; width: 50%; margin: 0 auto">
                    <van-button type="info" @click="onSubmit">
                        注册
                    </van-button>
                </div>
            </van-form>
        </div>
        <van-popup v-model="showPicker" position="bottom">
            <van-picker
                    show-toolbar
                    :columns="columns"
                    @confirm="onConfirm"
                    @cancel="showPicker = false"
            />
        </van-popup>
    </div>
</template>

<script>
import Navbar from '../../components/component/Navbar';
import {ApiRegister} from '@/Api/register';
export default {
    data(){
        return{
            head_title:'注册',
            showPicker:false,
            username:'',
            password:'',
            password2:'',
            name:'',
            area:'',
            dept:'',
            work:'',
            gov:'',
            columns:[],
            columnsArray:[
                ['华东网络部','华西网络部','华南网络部','华北网络部'],
                ['推广部','咨询部','技术部','策划部','人行部'],
                ['竞价','信息流','新媒体','电咨','网咨','行政','策划','技术','编辑','美工'],
                ['普通员工','组长','主管','经理','总监'],
            ],
        }
    },
    components:{
        Navbar,
    },
    methods:{
        onSubmit(){

            let register= {
                username: this.username,
                password: this.password,
                name: this.name,
                area: this.area,
                dept: this.dept,
                work: this.work,
                gov: this.gov,
            }

            ApiRegister(register).then(res=>{
                if(this.password!=this.password2){
                    this.$notify({ type: 'warning', message: '两次密码不一致' });
                }else{
                    if(res.data.code!=200){
                        this.$toast(res.data.msg);
                    }else{
                        this.$toast.success('注册成功');
                        this.$router.push('/');
                    }
                }
            })
        },
        getMyinfo(v){
            this.columns=this.columnsArray[v];
            this.showPicker=true;
        },
        onConfirm(value) {
            if(this.columnsArray.indexOf(this.columns)==0){
                this.area = value;
            }else if(this.columnsArray.indexOf(this.columns)==1){
                this.dept=value;
            }else if(this.columnsArray.indexOf(this.columns)==2){
                this.work=value;
            }else if(this.columnsArray.indexOf(this.columns)==3){
                this.gov=value;
            }
            this.showPicker = false;
        }
    },
    created() {

    }
}
</script>

<style scoped lang="less" type="text/less">
    .register{
        width: 100%;
        height: 100%;
        .main{
            width: 100%;
            height:auto;
            overflow-y: scroll;
            margin: 10px 0;
            .register{
                margin-top: 20px;
            }
        }
    }
</style>
