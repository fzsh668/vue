<template>
   <div class="main">
       <div class="head">
          <Navbar :head_title="head_title"></Navbar>
      </div>
       <van-loading size="24px" v-show="loading" class="loading">加载中...</van-loading>
       <div class="lists" v-show="loading==false">
           <div class="top">
               <p><span>当前日期 : </span><span>{{date}}</span></p>
               <p :class="role==true?'p1':''">{{issign}}</p>
           </div>
           <div class="info">
               <div class="info_sign">
                   <div><p><span>项目 : </span><span class="nums">{{project}}</span></p></div>
                   <div>
                       <p><span>姓名 : </span><span class="nums">{{name}}</span></p>
                   </div>
                   <div>
                       <p><span>份数 : </span></p>
                       <input type="text" placeholder="" v-model="fenshu" @input="changeFenshu" class="nums" onkeyup="this.value=this.value.replace(/\s+/g,'')">
                   </div>
                   <div>
                       <p><span>价格 : </span><span class="nums">{{num}}元</span></p>
                   </div>
               </div>
                <div class="tosign">
                    <van-button :loading="loadingBtn" type="primary" @click="addsign" :disabled="disabled">{{sian_status}}</van-button>
                    <p><span>当月费用 : </span><span>{{costs}}元</span></p>
                </div>
           </div>
       </div>
       <div  class="xuanfu" id="moveDiv" @click="allsign">
           <van-button type="primary" block>查看全部</van-button>
       </div>
    </div>
</template>
<script>
import Navbar from '../../../components/component/Navbar';
import {ApiSign,ApiAddSign,ApiMycost} from "@/Api/main"
import {ApiMonthCost} from "@/Api/main"
export default {
    data() {
        return {
            head_title:'签到',
            date:'',
            name:'',
            fenshu:1,
            project:'点餐',
            loadingBtn:false,
            issign:'',
            sian_status:'签到',
            disabled:false,
            uid:0,
            num:1,
            costs:0,
            role:false,
            loading:true,
            user:{},
            monthdate:'',
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
        changeFenshu(){
            this.num=this.fenshu;
        },
        getApiSign(){
            ApiSign({
                date:this.date,
                uid:this.uid,
            }).then(res=>{
                this.loading=false;
                if(res.data.msg=='已经签到'){
                    this.issign='已签到';
                    this.disabled=true;
                }
            })
        },
      addsign(){
          let info = {
              uid:this.uid,
              name:this.name,
              fenshu:this.fenshu,
              cost:this.num,
              date:this.date,
          }
          ApiAddSign(info).then(()=>{
              this.$toast.success('签到成功');
              this.issign='已签到';
              this.disabled=true;
              this.getmonthcost();

          })
      },
        getmonthcost(){
            ApiMycost({
                id:this.uid,
                monthdate:this.monthdate
            }).then(res=>{
                this.costs = res.data.data[0].costs;
            })

        },
        allsign(){
            this.$router.push({
                path:'/index/sign/all',
                query:{
                    uid:this.uid,
                }
            });
        }

    },
    created() {
        this.date = this.timeFormat(new Date());
        let date = new Date();
        this.monthdate = date.getFullYear()+'-'+(date.getMonth()+1>10?date.getMonth()+1:'0'+(date.getMonth()+1));
        this.$store.dispatch('getInfo').then(()=>{
            console.log(this.$store.state.user);
            this.uid = this.$store.state.user.id;
            this.name = this.$store.state.user.name;
            this.getApiSign();
            this.getmonthcost();
        })

    }
}
</script>
<style lang="less" type="text/less">
    .main{
        width: 100%;
        .loading{
            margin-top: 10%;
        }
        .lists{
            padding: 0 10%;
            margin-top: 5%;
            .top{
               //text-align: left;
                display: flex;
                display: -webkit-flex;
                justify-content: space-between;
                p{
                    font-size: 14px;
                    span{
                        margin-right: 5px;
                        font-size: 14px;
                    }
                }
               .p1{
                    color: #07c160;
                   opacity: 0.3;
                }
            }
            .info{
                .info_sign{
                    text-align: left;
                    div{
                        border-bottom:1px solid rgba(146, 142, 142, 0.3);
                        display: flex;
                        display: -webkit-flex;
                        padding: 10px 0;
                        input{
                            border:none;
                        }
                        span{
                            margin-right: 5px;
                        }
                        .nums{
                            color: #000;
                        }
                    }
                }
                .tosign{
                    text-align: left;
                    margin-top: 10px;
                    display: -webkit-flex;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    button{
                        width: 100px;
                    }
                    p{
                        color:#07c160;
                    }
                }
            }
        }
        .xuanfu {
            width: 100%;
            /* 如果碰到滑动问题，1.3 请检查 z-index。z-index需比web大一级*/
            z-index: 999;
            position: fixed;
            bottom: 0;
        }
    }
</style>