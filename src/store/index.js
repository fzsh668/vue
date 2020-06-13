import Vue from 'vue'
import Vuex from 'vuex'
import {login,getInfo} from '@/Api/user'
import router from "@/router";
import {setToken,getToken,setLogin,getLogin,setUser,getUser,removeToken} from "../utils/auth";

Vue.use(Vuex);
    const state = {
        name:'',
        isLogin:false,
        token:getToken(),
        logininfo:{},
        userId:'',
        work:'',
        area:'',
        uid:'',
        user:{},
    }
    const getters = {
        isLogin: state => state.isLogin,
        logininfo:state=>localStorage.getItem("logininfo"),
        gettoken:state=>localStorage.getItem('token'),
    }
    const mutations = {
        SET_USER:(state,user)=>{
            state.user=user;
        },
        SET_TOKEN:(state,token)=>{
          state.token=token;
            localStorage.setItem('token',state.token);
        },
        SET_ISLOGIN:(state,islogin)=>{
            state.isLogin=islogin;
        },
        SET_LOGININFO:(state,logininfo)=>{
            state.logininfo=logininfo
            localStorage.setItem('logininfo',JSON.stringify(state.logininfo));
        },
        REMOVE_USER:(state,user)=>{
            localStorage.clear();
        },
        SET_NAME:(state,name)=>{
            state.name = name;
        },
        SET_WORK:(state,work)=>{
            state.work = work;
        },
        SET_AREA:(state,area)=>{
            state.area = area;
        },
        SET_GOV:(state,gov)=>{
            state.gov = gov;
        },
        SET_UID:(state,uid)=>{
            state.uid = uid;
        }
    }
    const actions = {
        login({ commit }, userInfo) {
            const { username, password } = userInfo
            return new Promise((resolve, reject) => {
                login({ username: username.trim(), password: password }).then(response => {
                    //commit('SET_TOKEN',response.data.token);
                    console.log('response',response);
                    const  data = response.data;
                    commit('SET_TOKEN',response.data.token);
                    commit('SET_USER',response.data.data[0]);
                    commit('SET_LOGININFO',userInfo);
                    commit('SET_NAME',response.data.data[0].name);
                    resolve();
                }).catch(error => {
                    reject(error);
                })
            })
        },
        getInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                getInfo(state.token) //state.token
                    .then(response => {
                        const { data } = response.data;
                        if (!data) {
                            reject("验证失败，请重新登录。");
                        }
                       /* commit("SET_NAME",data[0].name);
                        commit("SET_WORK",data[0].work);
                        commit("SET_AREA",data[0].area);
                        commit("SET_GOV",data[0].gov);
                        commit('SET_UID',data[0].id);*/
                       commit("SET_USER",data[0]);
                       //console.log('1',state.user);
                        resolve();
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },
        // user logout
        logout({ commit, state }) {
            return new Promise((resolve, reject) => {
                // logout(state.token)
                //     .then(() => {
                commit("SET_TOKEN", "");
                // commit("SET_ROLES", []);
                removeToken();
                router.push('/');
                resolve();
                // })
                // .catch(error => {
                //     reject(error);
                // });
            });
        },
    }
const  store= new Vuex.Store({
    state,
    mutations,
    getters,
    actions,

});
export default store