import axios from 'axios';
//const api = "http://127.0.0.1";
const api = "http://kfy.daifu100.net/index.php";
const myAxios = axios.create({
    //定义公用请求
    baseURL: api,
    timeout: 30 * 1000,
    contentType: "application/x-www-form-urlencoded;charset=UTF-8"
});
export {api,myAxios}