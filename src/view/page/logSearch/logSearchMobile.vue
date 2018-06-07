<template>
    <div>
        <mt-header title="日志查询">
            <router-link to="/mobile" slot="left">
            <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button slot="right" @click.native="popupVisible=true">查询</mt-button>
        </mt-header>
        <mt-popup
        v-model="popupVisible"
        position="top">
        <div style="width:100%">
           <mt-cell title="开始日期">
            <span @click.native="open()" style="color: green" >{{form.startDate|formatDate}}</span>
            </mt-cell>
            <div style="width:100%">
              <mt-button      @click.native="search()" type="primary">查  询</mt-button>
            </div>
            
        </div>
        
        </mt-popup>
        <mt-datetime-picker
        v-model="form.startDate"
        ref="picker"
        type="date"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日">
        </mt-datetime-picker>
    </div>
</template>

<script>
import { formatDate } from "../../../components/common/date.js";
export default {
  data() {
    return {
      form: {
        startDate: "2018-06-05",
        description: "",
        endDate: "",
        logType: "",
        pageNo: 1
      },
      popupVisible: false
    };
  },
    filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    }
  },
  methods:{
    search(){
        console.log(1)
    },
      open(){
          console.log(111)
          this.$refs.picker.open();
      }
  }
};
</script>

<style scoped>
.mint-popup.mint-popup-top {
  width: 100%;
}
</style>