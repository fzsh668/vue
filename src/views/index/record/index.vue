<template>
    <div class="record">
        <div class="header">
            <Navbar :head_title="head_title"></Navbar>
        </div>
        <div class="lists">
            <van-field v-model="name" label="姓名" placeholder="请输入姓名"/>
            <van-field v-model="age" type="digit" label="年龄" placeholder="请输入年龄" />
            <van-field v-model="tel" type="text" label="手机号" placeholder="请输入手机号" />
            <van-field v-model="address" type="text" label="地址" placeholder="请输入地址" />
            <van-field v-model="origin"  type="text" label="来源"  placeholder="请输入来源"/>
            <van-field v-model="date" type="text" label="录入日期"  />
            <van-field v-model="other" type="text" label="附加" placeholder="请输入附加信息" />
            <van-field v-model="operator" type="text" label="操作人" placeholder="操作人" />
            <div class="but">
                <van-button type="default" @click="sub">提交</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '../../../components/component/Navbar';
import {ApiGetRecord} from "@/Api/main"
export default {
    data(){
        return{
            date:'',
            name:'',
            tel:'',
            age:'',
            address:'',
            other:'',
            show: false,
            operator:'',
            head_title:'资源录入',
            origin:'',
            uid:0,
        }
    },
    components:{
        Navbar,
    },
    methods:{
        onConfirm(value) {
            this.active = value;
            this.showPicker = false;
        },
        getTime:function(){
            var _this = this;
            let yy = new Date().getFullYear();
            let mm = new Date().getMonth()+1<10 ? '0'+(new Date().getMonth()+1) : (new Date().getMonth()+1);
            let dd = new Date().getDate()<10 ? '0'+new Date().getDate() : new Date().getDate();
            let hh = new Date().getHours()<10 ? '0'+new Date().getHours() : new Date().getHours();
            let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
            let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
            this.date = yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;
        },
        sub(){
            let record= {
                name: this.name,
                age: this.age,
                tel: this.tel,
                address:this.address,
                date:this.date,
                other: this.other,
                operator:this.operator,
                origin:this.origin,
                uid:this.uid,
            }
            //console.log(record);
            ApiGetRecord(record).then(()=>{
                    this.$toast.success('提交成功');
                    this.$router.push('/index')
            })

        }
    },
    created(){
        this.$store.dispatch('getInfo').then(()=>{
            this.operator = this.$store.state.user.name;
            this.uid = this.$store.state.user.id;
            console.log('this.uid',this.uid);
        })
        this.getTime();
    }
}
</script>

<style scoped lang="less" type="text/less">
    .record{
        width: 100%;
        .lists{
            text-align: left;
            padding: 0 10px;
            padding-top: 30px;
            p{
                color: #5a5e66;
                font-size: 16px;
            }
            input{
                width: 100%;
                border: none;
                border-bottom:1px solid rgba(146, 142, 142, 0.5);
                padding-bottom: 6px;
                margin-top: 8px;
            }
            .but{
                width: 100%;
                text-align: center;
                margin-top: 20px;
            }
        }
    }

</style>