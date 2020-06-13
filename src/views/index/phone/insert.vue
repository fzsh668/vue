<template>
    <div class="main">
        <div>
            <Navbar :head_title = head_title></Navbar>
        </div>
        <div class="box">
            <van-field v-model="user.name" label="姓名" placeholder="请输入姓名"  autofocus="autofocus"/>
            <van-field v-model="user.phone" type="tel" label="电话" placeholder="请输入联系方式"/>
            <van-field v-model="user.age"  label="年龄" placeholder="请输入年龄"/>
            <van-field name="radio" label="性别">
                <template #input>
                    <van-radio-group v-model="user.sex" direction="horizontal">
                        <van-radio name="1">男</van-radio>
                        <van-radio name="0">女</van-radio>
                    </van-radio-group>
                </template>
            </van-field>
            <van-field v-model="user.address"  label="地址" placeholder="请输入地址"/>
            <van-field v-model="user.origin"  label="来源" placeholder="请输入来源"/>
            <van-field v-model="user.date"  label="日期"readonly="readonly"  placeholder="请输入日期" @click="getdate"/>
            <van-field v-model="user.explain"  label="说明" placeholder="请输入说明"/>
            <div>
                <van-button type="info" @click="phoneInsert">提交</van-button>
            </div>
        </div>
        <van-popup v-model="show" round position="bottom" :style="{ height: '35%' }">
            <van-datetime-picker
                    v-model="currentDate"
                    type="date"
                    :min-date="minDate"
                    :max-date="maxDate"
                    visible-item-count="3"
                    @confirm="confirm()"
                    @cancel="cancel"
            />
        </van-popup>
    </div>
</template>

<script>
//import {Api} from "../../../Api";
import Navbar from '../../../components/component/Navbar';
import {ApiPhoneInsert} from '@/Api/main'
export default {
    data(){
        return{
            head_title:'增添留电',
            currentDate: new Date(),
            minDate: new Date(2020, 0, 1),
            maxDate: new Date(2030, 0, 31),
            user:{
                name:'',
                phone:'',
                age:'',
                sex:'1', //1 男 0 女
                address:'',
                origin:'',
                date:'',
                explain:'',
                uid:0,
            },
            show:false,
        }
    },
    methods:{
        confirm(){
            let date = this.timeFormat(this.currentDate);
            this.user.date = date;
            this.show=false;
            // console.log('this.currentDate',this.currentDate);
        },
        cancel(){
            this.show=false;
        },
        getdate(){
            this.show=true;
        },
        timeFormat(val) { // 时间格式化 2019-09-08
            let year = val.getFullYear();
            let month =
                val.getMonth() + 1 >= 10
                    ? val.getMonth() + 1
                    : "0" + (val.getMonth() + 1);
            let day = val.getDate() >= 10 ? val.getDate() : "0" + val.getDate();
            return year+'-'+month+'-'+day;
        },
        phoneInsert(){
           ApiPhoneInsert(this.user).then(()=>{
                    this.$toast.success('添加成功');
                    this.$router.push('/index/phone/index');

            })
        }
    },
    components:{
        Navbar,
    },
    created(){
        this.$store.dispatch('getInfo').then(()=>{
            this.user.uid = this.$store.state.user.uid;
        })
        this.user.date =this.timeFormat(new Date());
    }
}
</script>

<style scoped lang="less" type="text/less">
    .main{
        .box{
            button{
                margin-top: 20px;
            }
        }
    }

</style>