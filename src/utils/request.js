import axios from "axios";
import {api} from "../Api/Public";
import {getToken,setLogin} from "./auth";
import { Notify } from 'vant';

// create an axios instance
const service = axios.create({
    //定义公用请求
    baseURL: api,
    timeout: 30 * 1000,
    contentType: "application/x-www-form-urlencoded;charset=UTF-8"
});

// 请求前事件
service.interceptors.request.use(
   config => {
        // do something before request is sent
        let token =getToken();
      if (token) {
            config.headers["token"] = getToken();
        }
        return config;

    },
    error => {
        // do something with request error
        console.log(error); // for debug
        return Promise.reject(error);
    }
);

// 响应事件
service.interceptors.response.use(
    response => {
        const res = response;
        if(!res){
            this.$router.push('/');
        }
        if(res.data.code==-100){
            this.$router.push('/');
        }
        if(res.data.code!=200){
           // return Promise.reject(new Error(res.msg || 'Error'));
            console.log('res',res);
           Notify({ type: 'warning', message: res.data.msg });
            return Promise.reject(new Error(res.data.msg || "Error"));
        }else{
            return res;
        }

    },
    error => {
        console.log("err" + error); // for debug
        Notify({ type: 'warning', message: error.message });
    }
);


export default service;
