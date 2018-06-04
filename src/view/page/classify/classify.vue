<template>
    <div v-loading="fullscreenLoading" element-loading-background="rgba(255, 255, 255, 0.4)">
        <el-form :label-position="left" :inline="true" size="mini" label-width="80px" :model="formInline" class="demo-form-inline">
            <el-row>
              <el-col :span="6">
                <el-form-item label="类目名称">
                  <el-input v-model="formInline.cateName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="排序">
                    <el-input type="number" v-model="formInline.sort"></el-input>
                </el-form-item>
              </el-col>    
              <el-col :span="7">
                <el-form-item label="类目状态">
                    <el-select v-model="formInline.status" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
              </el-col>  
            </el-row>   
            <el-row>
              <el-col :span="18" style="text-align:center">
                <el-button size="mini" type="primary" @click="search" icon="el-icon-search">搜索</el-button>
                <el-button size="mini" type="primary" @click="add" icon="el-icon-circle-plus-outline">新增分类</el-button>
              </el-col>            
            </el-row> 
        </el-form>
        <el-table size="mini" ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%">
           <el-table-column label="序号"  type="index" width="55px">
            </el-table-column>
            <el-table-column prop="cateName" label="类目名称">
            </el-table-column>
            <el-table-column prop="sort" label="排序">
            </el-table-column>
            <el-table-column prop="status" label="类目状态">
                <template slot-scope="scope">
                    {{scope.row.status==1?'启用':'停用'}}
                </template>
            </el-table-column>
            <el-table-column prop="createDate" label="创建日期 ">
            </el-table-column>
            <el-table-column  prop="address" label="操作" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-button size="mini" type="primary" @click="togg(scope.row)">
                      {{scope.row.status==0?'启用':'停用'}}
                  </el-button>
                  <el-button size="mini" type="primary" @click="edit(scope.row)">
                      修改
                  </el-button>
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
        <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            width="500px"
            >
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="类目名称" prop="cateName">
                    <el-input v-model="ruleForm.cateName"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input v-model="ruleForm.sort"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="memo">
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="请输入内容"
                        v-model="ruleForm.memo">
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="Submit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { baseurl } from "../../../base.js";
import Eve from "../../../components/common/emit.js";
export default {
  mounted() {
    this.load();
  },
  data() {
    return {
      title: "添加",
      ruleForm: {
        cateName: "",
        sort: "",
        memo: ""
      },
      rules: {
        cateName: [{ required: true, message: "必填项", trigger: "blur" }],
        sort: [{ required: true, message: "必填项", trigger: "blur" }]
      },
      dialogVisible: false,
      options: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "0",
          label: "停用"
        },
        {
          value: "1",
          label: "启用"
        }
      ],
      baseurl: baseurl,
      fullscreenLoading: false,
      page: {
        total: 0
      },
      left: "left",
      tableData3: [],
      formInline: {
        cateName: "",
        sort: "",
        status: "",
        pageNo: 1
      }
    };
  },
  methods: {
    Submit() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          let url = !!this.ruleForm.cateId
            ? "/category/update"
            : "/category/add";
          this.$http.post(url, this.ruleForm).then(data => {
            Eve.$emit('categoryListChange');
            this.dialogVisible = false;
            this.load();
            this.$message({
              type: "success",
              message: "操作成功"
            });
          });
        }
      });
    },
    add() {
      this.$refs["ruleForm"] && this.$refs["ruleForm"].resetFields();
      for (var i in this.ruleForm) {
        this.ruleForm[i] = "";
      }
      
      this.title = "添加";
      this.dialogVisible = true;
    },
    edit(obj) {
      this.$refs["ruleForm"] && this.$refs["ruleForm"].resetFields();
      for (var i in obj) {
        this.ruleForm[i] = obj[i];
      }   
      this.title = "修改";
      this.dialogVisible = true;
    },
    togg(obj) {
      let data = {
        cateId: obj.cateId,
        status: obj.status == 0 ? 1 : 0
      };
      this.$http.post("/category/updateStatus", data).then(data => {
        this.load();
        this.$message({
          type: "success",
          message: "修改成功"
        });
      });
    },
    handleCurrentChange(index) {
      this.formInline.pageNo = index;
      this.load();
    },
    load() {
      this.fullscreenLoading = true;
      this.$http
        .post("/category/list", this.formInline)
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