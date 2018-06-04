<template>
    <div v-loading="fullscreenLoading" element-loading-background="rgba(255, 255, 255, 0.4)">
        <el-form :label-position="left" :inline="true" size="mini" label-width="80px" :model="formInline" class="demo-form-inline">
            <el-row>
              <el-col :span="6">
                <el-form-item label="商品名称">
                    <el-input v-model="formInline.gdName"></el-input>
                </el-form-item>
              </el-col>  
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
            </el-row>   
            <el-row>
              <el-col :span="16" style="text-align:center">
                <el-button size="mini" type="primary" @click="search" icon="el-icon-search">搜索</el-button>
              </el-col>            
            </el-row> 
        </el-form>
        <el-table size="mini" ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%">
           <el-table-column label="序号"  type="index" width="55px">
            </el-table-column>
            <el-table-column prop="gdName" label="商品名称">
            </el-table-column>
            <el-table-column prop="startDate" label="起始日期">
            </el-table-column>
            <el-table-column prop="endDate" label="截止日期">
            </el-table-column>
            <el-table-column prop="quantity" label="预售数量">
            </el-table-column>
            <el-table-column prop="saleCount" label="销售数量">
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
    </div>
</template>

<script>
import { baseurl } from "../../../base.js";
export default {
  mounted() {
    this.load();
  },
  data() {
    let date=new Date;
    let start=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate(),
    end=start;
    return {
      value7: [start,end],
      options:{
          1:'桌位管理',
          2:'销售分类',
          3:'商品管理',
          4:'订单管理',
          5:'设置打印'
      },
      fullscreenLoading: false,
      page: {
        total: 0
      },
      left: "left",
      tableData3: [],
      formInline: {
        startDate: "",
        gdName: "",
        endDate: "",
        pageNo: 1
      }
    };
  },
  methods: {
    handleCurrentChange(index) {
      this.formInline.pageNo = index;
      this.load();
    },
    load() {
      if(!this.value7){
       this.formInline.startDate=null;
       this.formInline.endDate=null;
      }else{
      this.formInline.startDate=this.value7[0];
      this.formInline.endDate=this.value7[1];
      }
      this.fullscreenLoading = true;
      this.$http
        .post("/goodCount/list", this.formInline)
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
.right {
  text-align: right;
}
</style>