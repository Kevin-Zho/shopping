import Vue from 'vue'
import Vuex from 'Vuex' //引入Vuex

// 单独写一个文件必须先引入vue  ********************************************************


Vue.use(Vuex); //注册vuex
export default new Vuex.Store({
  state: {
    addressId: 0, //用户选定的地址
    orderId: 0,
    total: 0
  },
  mutations: {
    setAddressId: function (state, id) {
      state.addressId = id;
    },
    setOrder: function (state, arr) {
      state.orderId = arr[0];
      state.total = arr[1];
    }
  }
});
//  ************  this.$store.commit("setAddressId", id); //触发vuex事件
// **********    {{this.$store.state.addressId}}//接收vuex事件

// var store = new Vuex.Store({
//   state: { //需要共享的数据
//     addressId: 0, //用户选定的地址id

//   },
//   mutations: { // 写一个方法：参数就是接收上面store对象
//     setaddressId: function (state, id) {
//       // state.addressId = id
//     },
//     // settotal: function (state, num) {
//     //   state.total = num
//     // },
//     // setdindanbianhao: function (state, num) {
//     //   state.dindanbianhao = num
//     // },
//     // setdizhi: function (state, str) {
//     //   state.dizhi = str
//     // },
//     // settel: function (state, num) {
//     //   state.tel = num
//     // }
//   }
// });