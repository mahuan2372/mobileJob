<template>
<div class="foter">
        <div class="bot">
            <div class="bot-li" :index="index.toString()" v-for="(item,index) in list" :key="index">
                <div class="img" @click="href(item.menuUrl)">
                     <img :src="require('../../../assets/images/icon-'+item.iconName+'-on.png')" />
                </div>               
                <span>{{item.menuNm}}</span>
            </div>
        </div>
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
    href(url){
      this.$router.push(url)
    },
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
  overflow:hidden;
}
.bot-li{
  width:33.33%;
  float: left;
  box-sizing: border-box;
  border:1px solid #e2dfdf;
  text-align: center;
  padding: 25px 0;
  background-color: #fff;
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
  width: 27%;
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