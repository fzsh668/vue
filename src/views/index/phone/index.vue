<template>
    <div class="main">
        <div>
            <Navbar :head_title="head_title"></Navbar>
        </div>
        <div class="lists">
            <div class="head">
                <div class="sel">
                    <van-field
                            readonly
                            clickable
                            name="calendar"
                            :value="date"
                            placeholder="点击选择日期"
                            @click="show = true"
                    />
                    <button @click="selPhone">
                        查询
                    </button>
                </div>
            </div>
            <div class="info">
                <div class="loading" v-show="loading==true">
                    <van-loading size="24px">加载中...</van-loading>
                </div>
                <div v-show="isempty== true">
                    <van-empty description="没有数据" />
                </div>
                <div class="list" v-for="item in lists" v-show="loading == false">
                    <div class="left">
                        <van-contact-card type="edit" :name="item.name" :tel="item.phone" :editable="false" />
                    </div>
                    <div class="right" >
                        <button @click="goUpdata(item)">详情</button>
                    </div>
                </div>
            </div>
        </div>
        <van-popup v-model="show" round position="bottom" :style="{ height: '35%' }">
            <van-datetime-picker
                    v-model="currentDate"
                    type="date"
                    :min-date="minDate"
                    :max-date="maxDate"
                    visible-item-count="3"
                    @confirm="confirm"
                    @cancel="cancel"
            />
        </van-popup>
        <div  class="xuanfu" id="moveDiv" @click="insertPhone"
        >
            <van-icon name="plus" size="25" color="#ebedf0"/>
        </div>
    </div>
</template>

<script>
//import {Api} from "../../../Api";
import Navbar from '../../../components/component/Navbar';
import {ApiGetPhone} from '@/Api/main';
export default {
    data(){
        return{
            head_title:'留电',
            date: '',
            showCalendar: false,
            currentDate: new Date(),
            minDate: new Date(2020, 0, 1),
            maxDate: new Date(2030, 0, 31),
            show:false,
            lists:[],
            loading:true,
            isempty:false,
        }
    },
    components:{
        Navbar,
    },
    methods:{
        timeFormat(val) { // 时间格式化 2019-09-08
            let year = val.getFullYear();
            let month =
                val.getMonth() + 1 >= 10
                    ? val.getMonth() + 1
                    : "0" + (val.getMonth() + 1);
            let day = val.getDate() >= 10 ? val.getDate() : "0" + val.getDate();
            return year+'-'+month+'-'+day;
        },
        confirm(){
            let date=this.timeFormat(this.currentDate);
            this.date=date;
            this.show=false;
        },
        cancel(){
            this.show=false;
        },
        selPhone(){
            this.getPhone();
        },
        getPhone(){
            this.loading = true;
            this.isempty=false;
            ApiGetPhone({
                'date':this.date,
            }).then(res=>{
                if(res.data.code!=200){
                    this.loading = false;
                    this.$notify({ type: 'warning', message:res.data.msg});
                }else{
                    if(!res.data.data.length){
                        this.loading = false;
                        this.isempty=true;
                    }else{
                        this.lists = res.data.data;
                        this.loading = false;
                        this.isempty=false;

                    }
                }
            })

        },
        insertPhone(){
            this.$router.push({
                path:'/index/phone/phoneInsert',
            })
        },
        goUpdata(v){
            this.$router.push({
                path:'/index/phone/updata',
                query:{
                    'user':JSON.stringify(v),
                }
            });
        }

    },
    created() {
        this.date = this.timeFormat(new Date());
        this.getPhone();
    }
}
</script>

<style scoped lang="less" type="text/less">
    .main{
        .lists{
            .head {
                width: 100%;
                display: flex;
                display: -webkit-flex;
                position: relative;
                justify-content: space-between;
                border-bottom: 1px solid #ebedf0;
                .sel{
                    width: 100%;
                    display: flex;
                    display: -webkit-flex;
                    justify-content: space-between;
                    .van-cell{
                        width: auto;
                    }
                    button{
                        width: auto;
                        background: none;
                        font-size: 16px;
                        border: none;
                        color: #2b85e4;
                        padding-right: 15px;
                    }
                }
            }
            .info{
                .loading{
                    padding-top: 10%;
                }
                .list{
                    width: 100%;
                    position: relative;
                    .right{
                        position: absolute;
                        right: 15px;
                        top: 15%;
                        padding-top: 5%;
                        button{
                            background: none;
                            border: none;
                            outline: none;
                            font-size: 14px;
                            color: #2b85e4;
                        }

                    }
                }
            }

        }
        .xuanfu {
            height: 40px;
            width: 40px;
            /* 如果碰到滑动问题，1.3 请检查 z-index。z-index需比web大一级*/
            z-index: 999;
            position: fixed;
            bottom: 0;
            left: 50%;
            margin-left: -20px;
            border-radius: 50%;
            border:1px solid rgba(0, 0, 0, 0.55);
            .van-icon{
                margin-top: 8px;

            }
        }

    }

</style>