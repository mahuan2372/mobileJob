//tab 标签页的记录切换
let label = {
  state: {
    index: '',
    list: []
  },
  mutations: {
    activeIndex(state, index) {
      state.index = index;
    },
    add(state, data) {
      console.log(data)
      let togg = true,
        index = 0;
      for (let i = 0; i < state.list.length; i++) {
        if (state.list[i].menuUrl == data.menuUrl) {
          index = i;
          togg = false;
          break;
        }
        index = i;
      }
      if (togg) {
        state.list.push(data);
        state.index = state.list[state.list.length - 1].menuUrl;
        console.log(state.index)
      } else {
        state.index = state.list[index].menuUrl;
      }
    },
    dele(state, index) {
      state.list.splice(index, 1);
    },

  }
};
export default label
