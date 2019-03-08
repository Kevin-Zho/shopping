<template>
  <div class="confirmation">
    <myhead></myhead>
    <daohang>
      <span>My Cart</span>
    </daohang>
    <proress :curindex="4"></proress>
    <confirmationlist></confirmationlist>
    <myfooter></myfooter>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import myhead from "../components/myhead";
import daohang from "../components/daohang";
import proress from "../components/proress";
import confirmationlist from "../components/confirmationlist";
import myfooter from "../components/myfooter";
export default {
  name: "confirmation",
  //import引入的组件需要注入到对象中才能使用
  components: {
    myhead,
    daohang,
    proress,
    confirmationlist,
    myfooter
  },
  data() {
    //这里存放数据
    return {
        da:""
    };
  },
  mounted() {
    
  }
};
</script>
<style lang='less' scoped>
/*@import url(); 引入公共css类*/
.confirmation {
  background: #eee;
}
</style>