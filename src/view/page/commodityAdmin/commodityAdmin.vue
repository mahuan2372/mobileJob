<template>
    <div v-loading="fullscreenLoading"  element-loading-background="rgba(255, 255, 255, 0.4)">
        <el-form :label-position="left" :inline="true" size="mini" label-width="80px" :model="formInline" class="demo-form-inline">
            <el-row>
              <el-col :span="6">
                <el-form-item label="商品名称">
                    <el-input v-model="formInline.gdName"></el-input>
                </el-form-item>
              </el-col>    
              <el-col :span="7">
                <el-form-item  label="销售分类">
                    <el-select clearable v-model="formInline.cateId" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.cateId"
                        :label="item.cateName"
                        :value="item.cateId">
                        </el-option>
                    </el-select>
                </el-form-item>
              </el-col>  
              <el-col :span="7">
                <el-form-item label="商品状态">
                    <el-select clearable  v-model="formInline.status" placeholder="请选择">
                        <el-option
                        v-for="item in optionS"
                        :key="item.Id"
                        :label="item.Name"
                        :value="item.Id">
                        </el-option>
                    </el-select>
                </el-form-item>
              </el-col>  
            </el-row>   
            <el-row>
              <el-col :span="22" style="text-align:center">
                <el-button size="mini" type="primary" @click="search" icon="el-icon-search">搜索</el-button>
                <el-button size="mini" type="primary" @click="add" icon="el-icon-plus">添加商品</el-button>
              </el-col>            
            </el-row> 
        </el-form>
        <el-table size="mini" header-cell-class-name="cen" cell-class-name="cen" ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%">
           <el-table-column label="序号"  type="index" width="55px">
            </el-table-column>
            <el-table-column prop="picUrl" label="商品图片" width="100px">
               <template slot-scope="scope">
                 <el-popover popper-class="cen"
                  placement="right"
                  :title="scope.row.gdName"
                  width="400"
                  trigger="hover">
                    <img style="width:350px;" :src="scope.row.picUrl" alt="加载失败">
                    <img slot="reference" style="width:80px;cursor: pointer;" :src="scope.row.picUrl" alt="加载失败">
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="gdName" label="商品名称">
            </el-table-column>
            <el-table-column prop="gdPrice" label="商品单价">
              <template slot-scope="scope">
                        {{scope.row.gdPrice}}元
              </template>
            </el-table-column>
            <el-table-column prop="cateName" label="销售分类">
            </el-table-column>
             <el-table-column prop="status" label="商品状态">
                 <template slot-scope="scope">
                    {{scope.row.status==0?'下架':'上架'}}
                 </template>
            </el-table-column>
             <el-table-column prop="quantity" label="预售数量">
            </el-table-column>
             <el-table-column prop="material" label="主要原料">

                <template slot-scope="scope">
                 <el-popover
                  placement="top"
                  title="主要原料"
                  width="200"
                  trigger="hover"
                  :content="'内容：'+scope.row.material"
                  >
                    <div class="memo" slot="reference">{{scope.row.material}}</div>
                    </el-popover>
                </template>

            </el-table-column>
             <el-table-column prop="rowUpdTs" label="更新日期">
            </el-table-column>
             <el-table-column prop="memo" label="商品描述">
                <template slot-scope="scope">
                 <el-popover
                  placement="top"
                  title="备注"
                  width="200"
                  trigger="hover"
                  :content="'内容：'+scope.row.memo"
                  >
                    <div class="memo" slot="reference">{{scope.row.memo}}</div>
                    </el-popover>
                </template>
            </el-table-column>
             <el-table-column prop="sourceIp" label="操作" width="147px">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="cal(scope.row)"> {{scope.row.status==1?'下架':'上架'}}</el-button>
                    <el-button size="mini" type="primary" @click="edit(scope.row)">修改</el-button>            
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
        <el-dialog :title="Title" :visible.sync="dialogFormVisible">
          <el-form   
          v-loading="loading2"
          element-loading-text="正在提交..."
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(255, 255, 255, 0.7)" size="mini" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
            <el-form-item label="商品名称" prop="gdName">
              <el-input  v-model="ruleForm.gdName"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="cateId">
              <el-select v-model="ruleForm.cateId" placeholder="请选择商品分类">
                 <el-option
                        v-for="item in options"
                        :key="item.cateId"
                        :label="item.cateName"
                        :value="item.cateId">
                        </el-option>
              </el-select>
            </el-form-item>  
            <el-form-item label="商品图片上传" prop="pic">
              <el-input type="hidden"  v-model="ruleForm.pic"></el-input>
                <el-upload
                  class="avatar-uploader"
                  :multiple="false"
                  name="uploadFile"
                  headers="Access-Control-Allow-Origin: *"
                  accept="image/*"
                  :action="uploadurl"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="picImg" :src="picImg" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>

            </el-form-item>        
            <el-form-item label="是否上架" prop="status">
              <el-switch :active-value="1" :inactive-value="0" v-model.number="ruleForm.status"></el-switch>
            </el-form-item>
            <el-form-item label="商品预售数量" prop="quantity">
              <el-input  v-model.number="ruleForm.quantity"></el-input>
            </el-form-item>
            <el-form-item label="商品单价" prop="gdPrice">
              <el-input v-model.number="ruleForm.gdPrice"></el-input>
            </el-form-item>
            <el-form-item label="主要原料" prop="material">
              <el-input type="textarea" v-model="ruleForm.material"></el-input>
            </el-form-item>
            <el-form-item label="商品描述" prop="memo">
              <el-input  type="textarea" v-model="ruleForm.memo"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button  type="primary" @click="submitForm('ruleForm')">保存</el-button>
              <el-button  @click="dialogFormVisible = false">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
    </div>
</template>

<script>
import Eve from "../../../components/common/emit.js";
import { baseurl } from "../../../base.js";
export default {
  created() {
    Eve.$on("categoryListChange", () => {
      this.$http.post("/category/all").then(data => {
        this.options = data.list;
      });
    });
    Eve.$emit("categoryListChange");
  },
  mounted() {
    this.load();
  },
  data() {
    var money = (rule, value, callback) => {
       if(!(/^\d+(\.\d{1,2})?$/.test(value))){
          callback(new Error("请输入精度为两位小数以内的金额"));
        } else {
          callback();
        }
    };
    return {
      loading2: false,
      picImg: "",
      Title: "",
      uploadurl: baseurl + "/file/upload",
      dialogFormVisible: false,

      imageUrl: "",

      ruleForm: {
        gdPrice: "",
        status: "",
        memo: "",
        pic: "",
        quantity: "",
        material: "",
        cateId: "",
        gdName: ""
      },
      rules: {
        pic: [{ required: true, message: "请上传商品图片", trigger: "change" }],
        gdName: [
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ],
        cateId: [
          { required: true, message: "请选择商品分类", trigger: "change" }
        ],
        memo: [
          { required: true, message: "请输入商品描述", trigger: "change" }
        ],
        material: [
          { required: true, message: "请输入主要原料", trigger: "blur" }
        ],
        gdPrice: [
          { required: true, message: "请输入商品单价", trigger: "blur" },
          { validator: money, trigger: "blur" }
        ],
        quantity: [
          { required: true, message: "请输入预售数量", trigger: "blur" },
          { type: "number", message: "必须为数字值", trigger: "blur" }
        ]
      },

      formLabelWidth: "120px",
      optionS: [
        { Id: 0, Name: "下架" },
        { Id: 1, Name: "上架" }
      ],
      value7: [],
      options: {
        1: "桌位管理",
        2: "销售分类",
        3: "商品管理",
        4: "订单管理",
        5: "设置打印"
      },
      fullscreenLoading: false,
      page: {
        total: 0
      },
      left: "left",
      tableData3: [],
      formInline: {
        cateId: "",
        gdName: "",
        status: "",
        pageNo: 1
      },
      editData: {}
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.ruleForm.pic = res.data.filename;  
      this.picImg = URL.createObjectURL(file.raw);
      this.$message.success("上传成功");
    },
    beforeAvatarUpload(file) {
      console.log(file);
      const isJPG = file.type.indexOf("image") >= 0;
      const isLt2M = file.size / 1024 / 1024 < 3;

      if (!isJPG) {
        this.$message.error("必须上传图片");
      }
      if (!isLt2M) {
        this.$message.error("图片大小不能超过 3MB!");
      }
      return isJPG && isLt2M;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let gdPrice=this.ruleForm.gdPrice;
          this.loading2 = true;
          let url = this.Title == "新增商品" ? "/goods/add" : "/goods/update";
          let Img = this.ruleForm.pic.split("/");
          this.ruleForm.rowUpdTs=null;
          this.ruleForm.gdPrice=Math.round((this.ruleForm.gdPrice*100));
          this.ruleForm.pic = Img[Img.length - 1];
          this.$http.post(url, this.ruleForm).then(
            data => {
              this.dialogFormVisible = false;
              this.$message.success(this.Title + "成功");
              this.load();
              this.loading2 = false;
            },
            () => {
              this.ruleForm.gdPrice=gdPrice;
              this.loading2 = false;
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    add() {
      this.$refs["ruleForm"] && this.$refs["ruleForm"].resetFields();
  
      for (let i in this.ruleForm) {
       
        this.ruleForm[i] = "";
      }
      console.log(this.ruleForm)
      this.picImg = "";
      this.ruleForm.status = 1;
      this.Title = "新增商品";
      this.dialogFormVisible = true;  
       },
    edit(obj) {
      console.log(this);
      this.Title = "修改商品";
      this.dialogFormVisible = true;
      this.$refs["ruleForm"] && this.$refs["ruleForm"].resetFields();
      let data = JSON.parse(JSON.stringify(obj));
      data.pic = data.picUrl;
      this.picImg = data.picUrl;
      data.picUrl = null;
      this.ruleForm = data;
    },
    cal(obj) {
      let data = {
        gdId: obj.gdId,
        status: obj.status == 1 ? 0 : 1
      };
      let str = obj.status == 1 ? "下架" : "上架";
      this.$http.post("/goods/updateStatus", data).then(() => {
        this.$message.success(str + "成功");
        this.load();
      });
    },
    handleCurrentChange(index) {
      this.formInline.pageNo = index;
      this.load();
    },
    load() {
      this.fullscreenLoading = true;
      this.$http
        .post("/goods/list", this.formInline)
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
.memo {
  max-height: 70px;
  overflow: hidden;
}
.img {
  width: 200px;
}
.cen {
  text-align: center;
}
.right {
  text-align: right;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .avatar-uploader-icon:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  border: 1px dashed #d9d9d9;
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>