<template>
    <div class="top" style="color:#666666">
        <div class="left" >欢迎您，<span style="color:#64caff">{{name}}</span></div>
        <div class="right">
            <div>
               {{new Date|formatDate}}
            </div>
            <div>             
                <el-dropdown  @command="set">
                  <span class="el-dropdown-link">
                    <i class="el-icon-setting" style="color:#64caff"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="0">打印机管理</el-dropdown-item>
                    <el-dropdown-item command="1">修改密码</el-dropdown-item>
                     <el-dropdown-item command="2">支付设置</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div @click="quit"  title="退出登录">
                <span class="menu-icon tuichu" ></span>
            </div>
        </div>
        <el-dialog title="打印机设置" :visible.sync="dialogTableVisible"  width="500px">
          <el-table header-cell-class-name="cen" cell-class-name="cen" size="mini" :data="gridData">
             <el-table-column type="index" label="序号" width="100"></el-table-column>
            <el-table-column property="macName" label="商品名称" ></el-table-column>
            <el-table-column property="address" label="设备状态" width="100">
              <template slot-scope="scope">
                 <el-button size="mini" @click="handleEdit(scope.row.macId)">测试设备</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-dialog>
         <el-dialog v-loading="loading" title="支付设置" :visible.sync="dialogTableVisible_"  width="300px">
           <el-row :gutter="24">
              <el-col :md="24" class="grid-content"><el-radio v-model="isPayBefore" label="1">下单立即支付</el-radio></el-col>
              <el-col :md="24" class="grid-content"><el-radio v-model="isPayBefore" label="0">餐后支付</el-radio></el-col>
              <el-col :md="24" class="grid-content cen"><el-button type="primary" size="mini" @click="PayBeforeEdit()">保存</el-button></el-col>
            </el-row>                      
           
        </el-dialog>
    </div>
</template>

<script>
import { formatDate } from "./common/date.js";
import { mapMutations, mapState } from "vuex";
export default {
  created(){
    this.$http.post('/machine/list').then(data=>{
      this.gridData=data.list;
    });
  },
  data() {
    return {
      loading:false,
      dialogTableVisible_:false,
      dialogTableVisible:false,
      gridData:[
        // {name:'我是1号',code:'DADSDSADSADASDDAD'}
      ],
      name: localStorage.getItem("username"),
      isPayBefore: localStorage.getItem("isPayBefore")
    };
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy年MM月dd日");
    }
  },
  methods: {
    PayBeforeEdit(){
      this.loading=true;
      this.$http.post('/paypredate?isPayBefore='+this.isPayBefore).then(data=>{
      this.$message.success("保存成功");
      localStorage.setItem("isPayBefore", this.isPayBefore);
      this.dialogTableVisible_=false;
      this.loading=false;
    },()=>{this.loading=false;});
    },
    onAdd(){

    },
    handleEdit(id){
      let data={
        macId:id
      }
      this.$http.post("/machine/test",data).then(() => {
         this.$message.success("发送成功");
      });
    },
    ...mapMutations({
      addd: "add" // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    }),
    set(command) {
      if(command==1){
        this.addd({ menuUrl: "editPw", menuNm: "修改密码",iconName: "editPw" });
      }else if(command==0){
        this.dialogTableVisible = true
      }else if(command==2){
         this.isPayBefore=localStorage.getItem("isPayBefore");
         this.dialogTableVisible_ = true
      }else{

      }
      
    },
    quit() {
      this.$http.post("/user/loginOut").then(() => {
        localStorage.setItem("tokenId", "");
        this.$router.push("/login");
      });
    }
  }
};
</script>

<style scoped>
.grid-content {
   padding:15px 0;
}
.top {
  display: flex;
  height: 100%;
  color: #a99999;
}
.top > div,
.right > div {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.left {
  width: 300px;
}
.right {
  flex: 1;
  justify-content: flex-end;
}
.right i {
  font-size: 25px;
}
.right > div {
  padding: 0 20px;
}
.right > div:nth-child(2) {
  border-right: 2px solid #a99999;
  border-left: 2px solid #a99999;
  box-sizing: content-box;
}
</style>