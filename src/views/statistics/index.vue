<template>
    <div class="main">
        <div class="head">
            <Navbar :head_title="head_title"></Navbar>
        </div>
        <div class="loading" v-show="loading==true">
            <van-loading size="24px">加载中...</van-loading>
        </div>
        <div class="lsits" v-show="loading==false">
            <div class="list_head">
                <p><span>当月数据 : </span><span>{{date}}</span></p>
                <button @click="goset">设置目标值</button>
            </div>
            <div class="list">
                <div>
                    <van-circle
                        v-model="sourceRate"
                        :rate="rate1"
                        :color="gradientColor"
                        :text="sourcerate"
                        :speed="60"
                        :size="80"
                    />
                </div>
                <div class="list_text">
                    <p><span>目标值</span><span>{{maxsource}}</span></p>
                    <p><span>当前完成值</span><span>{{currentsource}}</span></p>
                    <p><span>完成率</span><span>{{ratesource}}</span></p>
                    <p><span>奖金</span><span>{{monenysource}}</span></p>
                    <p><span>单位</span><span>个</span></p>
                </div>
            </div>
            <div class="list">
                <div>
                    <van-circle
                            v-model="phoneRate"
                            :rate="rate2"
                            :color="gradientColor"
                            :text="phonerate"
                            :speed="60"
                            :size="80"
                    />
                </div>
                <div class="list_text">
                    <p><span>目标值</span><span>{{maxphone}}</span></p>
                    <p><span>当前完成值</span><span>{{currentphone}}</span></p>
                    <p><span>完成率</span><span>{{ratephone}}</span></p>
                    <p><span>奖金</span><span>{{monenyphone}}</span></p>
                    <p><span>单位</span><span>个</span></p>
                </div>
            </div>
            <div class="list">
                <div>
                    <van-circle
                            v-model="achRate"
                            :rate="rate3"
                            :color="gradientColor"
                            text="业绩"
                            :speed="60"
                            :size="80"
                    />
                </div>
                <div class="list_text">
                    <p><span>目标值</span><span>{{maxach}}</span></p>
                    <p><span>当前完成值</span><span>{{currentach}}</span></p>
                    <p><span>完成率</span><span>{{rateach}}</span></p>
                    <p><span>奖金</span><span>{{monenyach}}</span></p>
                    <p><span>单位</span><span>万</span></p>
                </div>
            </div>

        </div>
        <div class="foot">
            <Tabbar></Tabbar>
        </div>
    </div>
</template>
<script>
import Navbar from '../../components/component/Navbar';
import Tabbar from '../../components/component/Tabbar';
import {ApiGetcurrent} from '@/Api/statistics';
export default {
    data() {
        return {
            head_title:'统计',
            currentRate:0,
            loading:false,
            gradientColor: {
                '0%': '#3fecff',
                '100%': '#6149f6',
            },
            date:'',
            sourceRate:0,
            phoneRate:0,
            achRate:0,
            speed:5,
            rate1:0,
            rate2:0,
            rate3:0,

            phonerate:'',
            sourcerate:'',

            maxsource:0,
            currentsource:0,
            ratesource:0,
            monenysource:0,

            maxphone:0,
            currentphone:0,
            ratephone:0,
            monenyphone:0,

            maxach:0,
            currentach:0,
            rateach:0,
            monenyach:0,

            currentMonth:'',
        }
    },
    components:{
        Navbar,
        Tabbar,
    },
    methods:{
        timeFormat(val) { // 时间格式化 2019-09-08
            let year = val.getFullYear();
            let month =
                val.getMonth() + 1 >= 10
                    ? val.getMonth() + 1
                    : "0" + (val.getMonth() + 1);
           // let day = val.getDate() >= 10 ? val.getDate() : "0" + val.getDate();
            return year+'-'+month;
        },
        change(){

        },
        getstatistics(){
            this.loading=true;
            this.date = this.timeFormat(new Date());
            ApiGetcurrent({
                date:this.date,
            }).then(res=>{
                this.loading=false;
                let max= res.data.data.max.data[0];
                if(max){
                    this.maxsource = max.maxrecord;
                    this.maxphone = max.maxphone;
                    this.maxach = max.maxach;
                    this.currentphone =res.data.data.phone.phoneCount;
                    this.currentsource = res.data.data.record.recordCount;
                    let phonerate = this.currentphone/this.maxphone;
                    let sourcerate = this.currentsource/this.maxsource;
                    this.phonerate ='留电'+
                        phonerate.toFixed(2)*100+'%';
                    this.sourcerate ='资源'+
                        sourcerate.toFixed(2)*100+'%';
                    //console.log('phonerate',phonerate);
                    this.rate2 = 100*phonerate;
                    this.rate1 = 100*sourcerate;
                }
            })

        },
        goset(){
            this.$router.push({
                path:'/statistics/setstatistics',
                query:{
                    'date':this.date,
                }
                });
        }
    },
    created() {
      this.getstatistics();
        this.change();
    }
}
</script>
<style lang="less" type="text/less">
    .main{
        width: 100%;
        .loading{
            margin-top: 15%;
        }
        .lsits{
            padding: 5% 10%;
            .list_head{
                text-align: left;
                padding: 2% 0 2% 0;
                font-size: 14px;
                display: flex;
                display: -webkit-flex;
                justify-content: space-between;
                align-items: center;
                p{
                    span{

                    }
                }
                button{
                    background:none;
                    border: none;
                    outline: none;
                    color: #2b85e4;
                }
            }
            .list{
                display: flex;
                display: -webkit-flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 8%;
                .list_text{
                    flex: 1;
                    margin-left: 10%;
                }
                p{
                    color: #7e8c8d;
                    display: flex;
                    display: -webkit-flex;
                    justify-content: space-between;
                    font-size: 14px;
                    span{
                        margin-right: 10%;
                    }
                }
            }
        }
    }
</style>