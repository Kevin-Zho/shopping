<template>
  <div class="progress">
    <ul>
      <li :class="curindex >=1? 'cur':''">Confirm Address</li>
      <li :class="curindex >=2? 'cur':''">View Your Order</li>
      <li :class="curindex >=3? 'cur':''">Make Payment</li>
      <li :class="curindex >=4? 'cur':''">Order Confirmation</li>
    </ul>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "proress",
  props:["curindex"],
  data () {
    return {
    }
  }
};
</script>
<style lang='less' scoped>
.progress {
  ul {
    width: 1300px;
    margin: 0 auto;
    display: flex;
    color: red;
    font-weight: 700;
    li {
      width: 325px;
      text-align: center;
      height: 60px;
      line-height: 60px;
      border-bottom: 3px solid #ccc;
      margin-top: 20px;
      position: relative;
    }
    li:before {
      content: "";
      width: 12px;
      height: 12px;
      background: #ccc;
      display: block;
      position: absolute;
      bottom: -7px;
      left: 50%;
      border-radius: 50%;
    }
    .cur {
      border-bottom: 3px solid red;
      &:before{
          background: red;
      }
    }
  }
}
</style>