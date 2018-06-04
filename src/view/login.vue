<template>
    <div class="login-body" v-loading.fullscreen.lock="fullscreenLoading">
      <div class="app">
        <div class="top"><img src="../assets/images/img-logo.png" alt=""></div>   
        <div class="bodd">
                  <div class="inp">
                      <div><img src="../assets/images/icon-zhanghu.png" alt=""></div>
                      <div><el-input placeholder="请输入账号" v-model="formLabelAlign.loginId"></el-input></div>        
                      <div></div>          
                  </div>
                  <div class="inp">
                     <div><img src="../assets/images/icon-mima.png" alt=""></div>
                     <div>
                      <el-input placeholder="请输入密码" :type="password" v-model="formLabelAlign.loginPwd"></el-input>
                     </div>
                     <div>
                       <img @click="togg" v-show="show" class="shou" src="../assets/images/icon-xianshi.png" alt="">
                       <img @click="togg" v-show="!show" class="shou" src="../assets/images/icon-yincang.png" alt="">
                     </div>
                  </div>  
                  <div class="inp">
                     <div><img src="../assets/images/icon-yanzheng.png" alt=""></div>
                     <div>
                      <el-input placeholder="请输入验证码" type="text" v-model="captcha"></el-input>
                     </div>
                     <div>
                        <img :src="vaite" @click="clickVaite" title="点击获取验证码" alt="">
                     </div>
                     <div style="width:100px;">
                       
                     </div>
                  </div>                                                        
       </div>  
       <el-button style="width:100%;margin-top:20px;backgorund-color:#64caff;font-size:20px" type="primary" @click="login">登 录</el-button>     
      </div>          
    </div>
</template>

<script>
import axios from "../httpjs.js";
import {baseurl} from '../base.js'
import { mapMutations } from "vuex";
export default {
  created() {
    this.vaite=baseurl+'/validPic?v='+(new Date).getTime();
  },
  methods: {
    ...mapMutations({
      init: "initdata"
    }),
    togg(){
      this.show=!this.show;
      this.password=this.password=='password'?'text':'password';
    },
    login() {
      if(!this.formLabelAlign.loginId){
        this.$message({
          type: "error",
          message: "请填写账号"
        });      
        return false
      }
      if(!this.formLabelAlign.loginPwd){
         this.$message({
          type: "error",
          message: "请填写密码"
        });   
        return false
      }
      this.fullscreenLoading = true;
      this.$http
        .post("/user/login?captcha="+this.captcha, this.formLabelAlign)
        .then(data => {
          localStorage.setItem("tokenId", data.tokenId);
          localStorage.setItem("menu", JSON.stringify(data.menuList));
          localStorage.setItem("dictionary", JSON.stringify(data.dictionary));
          localStorage.setItem("username", data.userName);
          localStorage.setItem("isPayBefore", data.isPayBefore);
          axios.defaults.headers.post["tokenId"] = data.tokenId;
          this.$router.push("/");
        })
        .catch(error => {
          this.fullscreenLoading = false;
        });
    },
    clickVaite(){
      this.vaite=baseurl+'/validPic?v='+(new Date).getTime();
    }
  },
  data() {
    return {
      vaite:'',
      show:true,
      password:'password',
      fullscreenLoading: false,
      labelPosition: "left",
      captcha:'',
      formLabelAlign: {
        loginId: "",
        loginPwd: ""
      }
    };
  }
};
</script>

<style scoped>
.shou{
  cursor: pointer;
}
.inp {
  padding: 18px 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eeeeee;
}
.inp > div:nth-child(1) {
  width:22px;
}
.inp > div:nth-child(2) {
  flex: 1;
}
.inp > div:nth-child(3) {
  width: 35px;
  text-align: right;
}
.top {
  text-align: center;
}
.app {
  width: 350px;
  padding: 20px 50px;
}
.bodd {
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
}
.centen {
  text-align: center;
  font-size: 27px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>