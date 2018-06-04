<template>
    <div class="h100">
        <el-tabs class="h100" type="border-card" v-model="editableTabsValue2" closable @tab-remove="removeTab">
        <el-tab-pane
            v-for="(item) in editableTabs2"
            :key="item.menuUrl"
            :label="item.menuNm"
            :name="item.menuUrl"
        >
        <div>
          <component v-bind:is="item.menuUrl">
          </component>
        </div>
        
        </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    editableTabs2() {
      return this.$store.state.label.list;
    },
    editableTabsValue2: {
      get: function() {
        return this.$store.state.label.index;
      },
      // setter
      set: function(newValue) {
        this.active(newValue);
      }
    }
  },
  data() {
    return {
      editable: ""
    };
  },
  methods: {
    ...mapMutations({
      active:'activeIndex',
      deldet: "dele" // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    }),
    removeTab(targetName) {
      let tabs = this.editableTabs2;
      let activeName = this.editableTabsValue2;
      let ind;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.menuUrl === targetName) {
            ind = index;
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.menuUrl;
            }
          }
        });
      }
      this.deldet(ind);
      this.editableTabsValue2 = activeName;
    }
  }
};
</script>

<style scoped>
.h100 {
  height: 100%;
  position: relative;
}
</style>