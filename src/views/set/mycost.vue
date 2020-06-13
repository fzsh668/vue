<template>
    <div class="myCost">
        <div class="head">
            <Navbar :head_title="head_title"></Navbar>
        </div>
        <div class="cost">
            <div class="head">
                <input v-model="monthdate" @click="showdate">
                <van-icon name="search" size="30" color="rgba(146, 142, 142, 0.3)" @click="serach"/>
            </div>
            <div class="empty" v-show="isempty">
                <van-empty description="无" />
            </div>
            <div v-show="loading" class="loading">
                <van-loading size="24px">加载中...</van-loading>
            </div>
            <div class="lists" v-show="isinfo">
                <div><p>ID : </p>
                    <p>{{my.uid}}</p>
                </div>
                <div><p>姓名 : </p>
                        <p>{{my.name}}</p>
                </div>
                <div><p>费用 : </p>
                    <p>{{my.costs}}</p>
                </div>
                <div>
                    <van-button type="info" @click="getDetail(my.uid)">详情</van-button>
                </div>
            </div>
        </div>
        <van-popup v-model="show" round position="bottom" :style="{ height: '35%' }">
            <van-datetime-picker
                    v-model="currentDate"
                    type="year-month"
                    :min-date="minDate"
                    :max-date="maxDate"
                    visible-item-count="3"
                    @confirm="confirm"
                    @cancel="cancel"
            />
        </van-popup>
    </div>

</template>
<script>
import Navbar from '../../components/component/Navbar';
import {ApiMycost} from '@/Api/main';
export default {
    data() {
        return {
            head_title:'我的费用',
            monthdate:'',
            show:false,
            currentDate: new Date(),
            minDate: new Date(2020, 0, 1),
            maxDate: new Date(2030, 0, 31),
            id:'',
            my:{},
            loading:true,
            isempty:false,
            isinfo:false,

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
            return year+'-'+month;
        },
        getMycost(){
            this.loading=true;
            this.isinfo=false;
            ApiMycost({
                monthdate:this.monthdate,
                id:this.id,
            }).then(res=> {
                console.log('res', res);
                if(!res.data.data[0].costs){
                    this.loading=false;
                    this.isempty=true;
                    this.isinfo=false;
                }else {
                    this.isempty=false;
                    this.my = res.data.data[0];
                    this.isinfo=true;
                    this.loading=false;
                }
            }).catch(()=>{
                this.loading=false;
            })
        },
        getDetail(id){
            console.log('id',id);
            this.$router.push({
                path:'/index/sign/detail',
                query:{
                    id:id
                }
            })
        },
        serach(){
          this.getMycost();
        },
        confirm(v){
            this.monthdate = this.timeFormat(v);
            this.show=false;
        },
        cancel(){
            this.show=false;
        },
        showdate(){
            this.show=true;
        }
    },
    created() {
        let date = new Date();
        this.monthdate = date.getFullYear()+'-'+(date.getMonth()+1>10?date.getMonth()+1:'0'+(date.getMonth()+1));
        this.id = this.$route.query.id;
        console.log('this.id',this.id);
        this.getMycost();
    }
}
</script>
<style scoped lang="less" type="text/less">
    .myCost{
        width: 100%;
        .cost{
            .loading{
                margin-top: 15%;
            }
            .head{
                padding: 2% 10%;
                display: flex;
                display: -webkit-flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid rgba(146, 142, 142, 0.3);
                input{
                    border: none;
                    font-size: 16px;
                    color: #7e8c8d;
                }
            }
            .lists{
                padding: 0 10%;
                div{
                    width: 100%;
                    display: flex;
                    display: -webkit-flex;
                    padding: 5% 0;
                    align-items: center;
                    //border-bottom: 1px solid rgba(146, 142, 142, 0.3);
                p{
                    margin-right: 5%;
                    font-size: 14px;
                }
                }
            }
        }
    }
</style>