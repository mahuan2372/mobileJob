<template>
    <div v-loading="fullscreenLoading" element-loading-background="rgba(255, 255, 255, 0.4)">
        <el-form :label-position="left" :inline="true" size="mini" label-width="80px" :model="formInline" class="demo-form-inline">
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
              <el-col :span="6">
                <el-form-item label="操作内容">
                    <el-input v-model="formInline.description"></el-input>
                </el-form-item>
              </el-col>    
              <el-col :span="7">
                <el-form-item label="操作类型">
                    <el-select clearable v-model="formInline.logType" placeholder="请选择">
                        <el-option 
                        v-for="(k,v) in options"
                        :key="k"
                        :label="k"
                        :value="v">
                        </el-option>
                    </el-select>
                </el-form-item>
              </el-col>   
            </el-row>   
            <el-row>
              <el-col :span="22" style="text-align:center">
                <el-button size="mini" type="primary" @click="search" icon="el-icon-search">搜索</el-button>
              </el-col>            
            </el-row> 
        </el-form>
        <el-table size="mini" ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%">
           <el-table-column label="序号"  type="index" width="55px">
            </el-table-column>
            <el-table-column prop="logDate" label="操作日期">
            </el-table-column>
            <el-table-column prop="logType" label="操作类型">
              <template slot-scope="scope">
                    {{options[scope.row.logType]}}
                </template>
            </el-table-column>
            <el-table-column prop="description" label="操作内容">
            </el-table-column>
            <el-table-column prop="sourceIp" label="来源IP ">
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
    let { logTypeList } = JSON.parse(localStorage.getItem("dictionary"));
    return {
      value7: [],
      //   options: [
      //     { value: "1", label: "桌位管理" },
      //     { value: "2", label: "销售分类" },
      //     { value: "3", label: "商品管理" },
      //     { value: "4", label: "订单管理" },
      //     { value: "5", label: "设置打印" }
      //   ],
      options: logTypeList,
      fullscreenLoading: false,
      page: {
        total: 0
      },
      left: "left",
      tableData3: [],
      formInline: {
        startDate: "",
        description: "",
        endDate: "",
        logType: "",
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
      if (!this.value7) {
        this.formInline.startDate = null;
        this.formInline.endDate = null;
      } else {
        this.formInline.startDate = this.value7[0];
        this.formInline.endDate = this.value7[1];
      }

      this.fullscreenLoading = true;
      this.$http
        .post("/operationLog/list", this.formInline)
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