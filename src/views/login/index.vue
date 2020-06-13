<<template>
    <div class="login">
        <div class="form">
            <p>管理后台</p>
            <div class="info">
                <van-form >
                    <van-field
                            v-model="username"
                            name="username"
                            label="用户名"
                            placeholder="用户名"
                    />
                    <van-field
                            v-model="password"
                            type="password"
                            name="password"
                            label="密码"
                            placeholder="密码"
                    />
                    <div class="status">
                        <van-checkbox v-model="isLogin" shape="square">记住登陆状态</van-checkbox>
                        <van-loading v-show="loading==true" type="spinner" color="#000" size="24px"/>
                    </div>
                    <div class="bt">
                        <van-button type="default" @click="login">
                            提交
                        </van-button>
                        <van-button type="default" @click="goregister">
                            注册
                        </van-button>
                    </div>
                </van-form>
            </div>
        </div>
    </div>
</template>

<script>
//import {Api} from "../../../Api";
import {getLogin,getUser,setLogin,removeLogin} from "../../utils/auth";
export default {
    data(){
        return{
            username: '',
            password: '',
            isLogin:false,
            loading:false,
        }

    },
    methods:{
        login(){
            this.loading=true;
         let v={
                username:this.username,
                password:this.password
            }
        this.$store.dispatch('login',v).then(()=>{
            setLogin(this.isLogin);
            this.loading=false;
          this.$router.push({
                    path:'/index'
                })
           // this.loading=false;
        }).catch(
            this.loading=false
        )
        },
        goregister(){
            this.$router.push('/register');
        }
    },
    computed:{

    },
    created() {
          if(getLogin()=='true'){
              this.isLogin=true;
            let u = JSON.parse(this.$store.getters.logininfo);
            this.username=u.username;
            this.password = u.password;
          }
       /*   if(getLogin()=='false'){
              removeLogin();
          }*/
    }
}
</script>

<style scoped lang="less" type="text/less">
    @width: 100%;
    @height: 100%;
    @color: red;
    .login{
        width: 100%;
        height: 100%;
        background: #3590E7;
        background: -moz-linear-gradient(top, #84B527 0%, #ffffff 50%, #84B527 100%);
        background: -webkit-linear-gradient(top, #84B527 0%, #ffffff 50%, #84B527 100%);
        background: -o-linear-gradient(top, #84B527 0%, #ffffff 50%, #84B527 100%);
        background: -ms-linear-gradient(top, #84B527 0%, #ffffff 50%, #84B527 100%);
        background: linear-gradient(top, #84B527 0%, #ffffff 50%, #84B527 100%);
        .form{
            width: 100%;
            padding-top: 20%;
            p{
                font-size: 20px;
                color: #fff;
            }
            .info{
                width: @width;
                height: @height;
                margin-top: 25px;
                .status{
                    padding: 15px 30px;
                }
                .van-form{
                    padding: 0 10%;
                }
                .van-field{
                    height: 40px;
                  margin-top: 10px;
                }
                .bt{
                    width: 50%;
                    margin: 0 auto;
                    display: flex;
                    margin-top: 15px;
                    justify-content: space-between;

                }
                .status{
                    display: flex;
                    display: -webkit-flex;

                .van-loading{
                    margin-left: 10%;
                }
                }
            }
        }
    }
</style>