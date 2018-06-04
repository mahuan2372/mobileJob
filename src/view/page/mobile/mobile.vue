<template>
<div class="foter">
    <el-col class="bot" :span="24">
            <el-menu default-active="" class="el-menu-vertical-demo" @select="handleOpen"
            background-color="#43536e"
            text-color="#fff"
            active-text-color="#fff">
            <el-menu-item :index="index.toString()" v-for="(item,index) in list" :key="index">
                <span class="menu-icon" :class="item.iconName"></span>
                <span>{{item.menuNm}}</span>
            </el-menu-item>
            </el-menu>
        </el-col>
</div>
        
</template>

<script>
import { mapMutations,mapState } from "vuex";
export default {
  created(){
    this.init(JSON.parse(localStorage.getItem('menu')));
  },
  computed:{
    list() {
      return this.$store.state.menu.list;
    },
  },
  data() {
    return {      
    };
  },
  methods: {
    ...mapMutations({
      init: "initdata",
      addd: "add"// 将 `this.add()` 映射为 `this.$store.commit('increment')`
    }),
    handleOpen(key, keyPath) {
        this.addd(this.list[key]);
    }
  }
};
</script>

<style scoped>
.bot {
  flex: 1;
}
.img {
  height: 66px;
  color: #fff;
  line-height: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.img img{
  width: 95%;
}
.foter {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.el-menu-item i {
  font-size: 25px;
  text-align: left;
  width: 35px;
}
</style>