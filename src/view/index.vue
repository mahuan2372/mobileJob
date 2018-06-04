<template>
    <el-container class="fill">
      <el-aside width="220px">
        <menuList />
      </el-aside>
      <el-container>
        <el-header height="66px">
          <headTop></headTop>
        </el-header>
        <el-main>
          <econtent></econtent>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
import menuList from '../components/menu.vue'
import headTop from '../components/headTop.vue'
import econtent from '../components/econtent.vue'
export default {
  components:{
    menuList,
    headTop,
    econtent
  },
  mounted() {},

  data() {
    return {
      number: ""
    };
  },

  methods: {}
};
</script>

<style scoped>
  .fill{
    height: 100%;
  }
  .el-aside {
    background-color: #43536e;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  .el-header{
    padding: 0 30px;
  }
  .el-main{
    height: 100%;
    padding: 0 30px 10px;
  }
</style>