<template>
    <div v-loading="fullscreenLoading" element-loading-background="rgba(255, 255, 255, 0.4)">
        <el-form :label-position="left" :inline="true" size="mini" label-width="85px" :model="formInline" class="demo-form-inline">
            <el-row>
              <el-col :span="6">
                <el-form-item label="桌位编号">
                    <el-input v-model="formInline.tcId"></el-input>
                </el-form-item>
              </el-col>  
              <el-col :span="6">
                <el-form-item label="订单编号">
                    <el-input v-model="formInline.orderId"></el-input>
                </el-form-item>
              </el-col> 
              <el-col :span="6">
                <el-form-item label="交易流水号">
                    <el-input v-model="formInline.tradeNo"></el-input>
                </el-form-item>
              </el-col>              
            </el-row>   
            <el-row>
            <el-col :span="10">
                <el-form-item label="日期">
                   <el-date-picker
                          v-model="value7"
                          type="daterange"
                          align="right"
                          unlink-panels
                          range-separator="-"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          value-format="yyyy-MM-dd"
                         >
                        </el-date-picker>
                </el-form-item>
              </el-col>  
              <el-col :span="2" style="text-align:center">
                <el-button size="mini" type="primary" @click="search" icon="el-icon-search">搜索</el-button>
              </el-col>            
            </el-row> 
        </el-form>
        <el-table ref="multipleTable" :data="tableData3" size="mini" tooltip-effect="dark" style="width: 100%" header-cell-class-name="cen" cell-class-name="cen">
           <el-table-column label="序号"  type="index" width="55px">
            </el-table-column>
            <el-table-column prop="tcId" label=" 桌位编号" width="85px">
            </el-table-column>
            <el-table-column prop="orderId" label="订单编号">
            </el-table-column>
            <el-table-column prop="payTime" label="订单日期">
            </el-table-column>
            <el-table-column label="包含商品">
                <template slot-scope="scope">                 
                    <div title="点击查看详情" v-if="scope.row.goodsList[0]" class="po" @click="content(scope.row)">
                        <div>{{scope.row.goodsList[0].gdName}}*{{scope.row.goodsList[0].gdNum}}</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="gdNum" label="数量" width="55px">
            </el-table-column>
            <el-table-column prop="payAmt" label="订单金额">
                <template slot-scope="scope">
                    {{scope.row.payAmt}}元
                </template>
            </el-table-column>
            <el-table-column  label="订单状态" >
                <template slot-scope="scope">
                    {{option[scope.row.status]}}
                    <div v-if="scope.row.status==1">
                        <el-button size="mini" type="primary" @click="money(scope.row)">现金付款</el-button>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="tradeNo" label="交易流水号">
            </el-table-column>
            <el-table-column label="订单备注">
                <template slot-scope="scope">
                    <div :title="scope.row.memo" class="hide" v-html="scope.row.memo"></div>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="170px">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="show(scope.row)">详情</el-button>
                    <el-button size="mini" type="primary" @click="donw(scope.row.orderId)">重发订单</el-button>            
                </template>
            </el-table-column>
        </el-table>
        <br/>
        <div class="block">
            <el-pagination class="right"
            @current-change="handleCurrentChange"
            :current-page="formInline.pageNo"
            :page-size="10"
            layout="total, prev, pager, next, jumper"
            :total="page.total">
            </el-pagination>
        </div>
        <el-dialog title="商品订单详情" :visible.sync="dialogTableVisible" width='500px'>
            <el-table  header-cell-class-name="cen" cell-class-name="cen" :data="gridData">
                <el-table-column label="序号"  type="index" width="55px"></el-table-column>
                <el-table-column property="gdName" label="商品名称"></el-table-column>
                <el-table-column property="gdNum" label="数量"></el-table-column>
                <el-table-column property="gdAmt" label="金额">
                    <template slot-scope="scope">
                        {{scope.row.gdAmt}}元
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
        <el-dialog title="订单详情" :visible.sync="dialogTableVisible_" width='500px'>
            <el-form :inline="true" :model="showform" class="demo-form-inline">
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-col :span="5">桌位编号:</el-col>
                        <el-col :span="19">{{showform.tcId}}</el-col>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-col :span="5">订单编号:</el-col>
                        <el-col :span="19">{{showform.orderId}}</el-col>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-col :span="5">订单日期:</el-col>
                        <el-col :span="19">{{showform.payTime}}</el-col>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                     <el-col :span="24">
                        <el-col :span="5">交易编号:</el-col>
                        <el-col :span="19">{{showform.tradeNo}}</el-col>
                    </el-col>
                </el-row>
            </el-form>
            <el-table  header-cell-class-name="cen" cell-class-name="cen" :data="showform.goodsList">
                <el-table-column label="序号"  type="index" width="55px"></el-table-column>
                <el-table-column property="gdName" label="商品名称"></el-table-column>
                <el-table-column property="gdNum" label="数量"></el-table-column>
                <el-table-column property="gdAmt" label="金额">
                    <template slot-scope="scope">
                        {{scope.row.gdAmt}}元
                    </template>
                </el-table-column>
            </el-table>
             <el-row :gutter="20">
                    <el-col :span="24">
                        <el-col :span="3">备注:</el-col>
                        <el-col :span="21" v-html="showform.memo"></el-col>
                    </el-col>
                </el-row>
        </el-dialog>
    </div>
</template>

<script>
import { baseurl } from "../../../base.js";
export default {
  mounted() {
    this.load();
  },
  data() {
    return {
      dialogTableVisible_: false,
      dialogTableVisible: false,
      gridData: [],
      option: {
        0: "未下单",
        1: "待支付",
        2: "支付成功",
        3: "支付失败",
        4: "已关闭",
        5: "已撤销",
        6: "已退款处理中",
        7: "已退款"
      },
      value7: [],
      fullscreenLoading: false,
      page: {
        total: 0
      },
      left: "left",
      tableData3: [],
      formInline: {
        startDate: "",
        orderId: "",
        endDate: "",
        tcId: "",
        tradeNo: "",
        pageNo: 1
      },
      showform: {}
    };
  },
  methods: {
    money(obj) {
      let data = {
        status: 2,
        orderId: obj.orderId
      };
      this.$confirm(`请确认对方现金付款${obj.payAmt}元！`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.fullscreenLoading = true;
          this.$http.post("/order/updateStatus", data).then(() => {
            this.load();
            this.$message({
              type: "success",
              message: "修改成功!"
            });
          },()=>{ this.fullscreenLoading = false;});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    show(arr) {
      this.dialogTableVisible_ = true;
      this.showform = arr;
    },
    content(arr) {
      this.dialogTableVisible = true;
      // let data=JSON.parse(JSON.stringify(arr.goodsList));
      // data.push({gdName: "总计", gdAmt: arr.payAmt, gdNum:arr.gdNum});
      this.gridData = arr.goodsList;
    },
    handleCurrentChange(index) {
      this.formInline.pageNo = index;
      this.load();
    },
    donw(orderId) {
      // let data={orderId:orderId};
      this.$http.post("/order/reSendOrder?orderId=" + orderId).then(data => {
        this.$message.success("发送成功！");
      });
    },
    load() {
      if (!this.value7) {
        this.formInline.startDate = null;
        this.formInline.endDate = null;
      } else {
        this.formInline.startDate = this.value7[0];
        this.formInline.endDate = this.value7[1];
      }
      this.fullscreenLoading = true;
      this.$http
        .post("/order/list", this.formInline)
        .then(data => {
          this.fullscreenLoading = false;
          this.tableData3 = data.list;
          this.page.total = data.rowTotal;
        })
        .catch(error => {
          this.fullscreenLoading = false;
        });
    },
    search() {
      this.formInline.pageNo = 1;
      this.load();
    }
  }
};
</script>

<style scoped>
.po {
  cursor: pointer;
}
.po:hover {
  color: red;
}
.hide {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}
.cen {
  text-align: center;
}
.right {
  text-align: right;
}
</style>