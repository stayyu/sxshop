// request.js
import axios from "axios";
import { ElMessage } from "element-plus";
import { userAllDataStore } from '@/stores';; // 引入 userAllDataStore

const NETWORD_ERROR = "网络异常，请稍后重试";
const service = axios.create();

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
service.interceptors.response.use(
    (res)=>{
        if(res.status === 200){
            return res.data;
        }else{
            ElMessage.error(res.msg||NETWORD_ERROR);
            return Promise.reject(res.msg|NETWORD_ERROR);
        }
    }
);

// request拦截器
service.interceptors.request.use(config => {
    const store = userAllDataStore(); // 获取 store 实例
    if (store.state.token !== ""){
    config.headers['x-token'] = store.state.token || ''; // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  }, error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  });

function request(options){
    options.method = options.method || "get";
    if(options.method.toLowerCase() === "get"){
        options.params = options.params;
    }
    if(options.method.toLowerCase() === "post"){
        options.data = options.data;
    }
    if(options.method.toLowerCase() === "put"){
        options.params = options.params;
    }
    
    return service(options);
}
export default request;