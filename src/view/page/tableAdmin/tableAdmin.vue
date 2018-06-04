<template>
    <div v-loading="fullscreenLoading" element-loading-background="rgba(255, 255, 255, 0.4)">
        <el-form :label-position="left" :inline="true" size="mini" label-width="80px" :model="formInline" class="demo-form-inline">
            <el-row>
              <el-col :span="6">
                <el-form-item label="桌位号码">
                  <el-input v-model="formInline.tcId"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="日期">
                  <el-row>
                    <el-col :span="10">
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
                    </el-col>
                  </el-row>                 
                </el-form-item>
              </el-col>    
            </el-row>   
            <el-row>
              <el-col :span="16" style="text-align:center">
                <el-button size="mini" type="primary" @click="search" icon="el-icon-search">搜索</el-button>
                <el-button size="mini" type="primary" @click="open3" icon="el-icon-circle-plus-outline">添加桌位</el-button>
                <el-button size="mini" type="primary" icon="el-icon-download" @click="donwAll">批量下载</el-button>
              </el-col>            
            </el-row> 
        </el-form>
        <el-table size="mini" ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
           <el-table-column label="序号"  type="index">
            </el-table-column>
           <el-table-column  type="selection">
            </el-table-column>
            <el-table-column label="桌位编号">
                <template slot-scope="scope">{{ scope.row.tcId }}</template>
            </el-table-column>
            <el-table-column prop="createDate" label="创建日期">
            </el-table-column>
            <el-table-column  prop="address" label="操作" show-overflow-tooltip>
                <template slot-scope="scope">
                  <!-- <a :href="baseurl+scope.row.tcId" download="">下载二维码</a> -->
                  <el-button size="mini" type="primary" icon="el-icon-download" @click="donw(scope.row.tcId)">下载二维码</el-button>
                </template>
            </el-table-column>
        </el-table>
        <br/>
        <div class="block">
            <el-pagination class="right"
            @current-change="handleCurrentChange"
            :current-page="page.currentPage"
            :page-size="10"
            layout="total, prev, pager, next, jumper"
            :total="page.total">
            </el-pagination>
        </div>
        <iframe ref="iframe" src="/index.html" style="display:none">
        
        </iframe>
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
      baseurl: baseurl,
      fullscreenLoading: false,
      page: {
        total: 0,
        currentPage: 1
      },
      value7: "",
      left: "left",
      tableData3: [],
      multipleSelection: [],
      formInline: {
        tcId: "",
        startDate: "",
        endDate: "",
        pageNo: 1
      }
    };
  },
  methods: {
    donwAll() {
      if (this.multipleSelection.length == 0) {
        this.$notify.error({
          title: "错误",
          message: "请选择至少一个"
        });
      } else {
        let data = [];
        this.multipleSelection.forEach(element => {
          data.push(element.tcId);
        });
        data = data.join(",");
        this.donw(data);
      }
    },
    donw(a) {
      this.$http.post("/tableCard/downloadQr", { tcIds: a }).then(data => {
        this.$refs.iframe.src = data.url;
      });
    },
    handleCurrentChange(index) {
      this.page.currentPage = index;
      this.load();
    },
    load() {
      console.log(this.page);
      if(!this.value7){
        this.value7=[null,null]
      }
      this.fullscreenLoading = true;
      let data = {
        tcId: this.formInline.tcId,
        pageNo: this.page.currentPage,
        startDate: this.value7[0],
        endDate: this.value7[1]
      };
      this.$http
        .post("/tableCard/list", data)
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
      this.page.currentPage = 1;
      this.load();
    },
    open3() {
      this.$prompt("请输入数量", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /\d/,
        inputErrorMessage: "请输入正确的数量"
      })
        .then(({ value }) => {
          this.$http
            .post("/tableCard/add", { count: value })
            .then(() => {
              this.load();
              this.$message({
                type: "success",
                message: "添加成功"
              });
            })
            .catch();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    onSubmit() {
      console.log("submit!");
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>

<style scoped>
.right {
  text-align: right;
}
</style>