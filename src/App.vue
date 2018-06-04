<template>
<transition name="el-zoom-in-center" mode="out-in">
  <router-view />
</transition>
  
</template>

<script>
export default {
  name: "App",
  mounted() {
    // this.$http
    //   .post("/order/list", {
    //     firstName: "Fred",
    //     lastName: "Flintstone"
    //   })
    //   .then(function(response) {
    //     console.log(response);
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });
  },
  data() {
    return {
      input: ""
    };
  }
};
</script>

<style>
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity 1s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
