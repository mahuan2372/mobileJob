import axios from 'axios'
import router from './router'
import { Notification } from 'element-ui'
import {baseurl} from './base.js'
axios.interceptors.response.use((res) =>{
    if(res.data.code==200){
      return Promise.resolve(res.data.data);
    }else if(res.data.code==303){
      Notification.error({
        title: '错误',
        message: '账户在别的地方登陆或者过期，请重新登陆！'
      });
      axios.defaults.headers.post['tokenId'] ='';
      localStorage.setItem("tokenId",'')
      router.push({ path: '/login' })
    }
    else{    
      Notification.error({
        title: '错误',
        message: res.data.msg
      });
      return Promise.reject(res.data);
    }
  }, (error) => {
    //404等问题可以在这里处理
    Notification.error({
      title: '错误',
      message: error
    });
    return Promise.reject(error);
  });
  axios.defaults.baseURL=baseurl;
  axios.defaults.timeout = 10000;
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
  if(!!localStorage.getItem("tokenId")){
    axios.defaults.headers.post['tokenId'] = localStorage.getItem("tokenId");
  }
export default axios;