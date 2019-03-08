<!--  -->
<template>
  <div class="confirmationlist">
    <dl>
      <dt>
        <img src="static/ok-2.png">
      </dt>
      <dd>
        <p>Congratulations!</p>
        <p>Your order is under processing!</p>
        <p>
          <span>order &nbsp; ID:</span>
          <i>{{this.$store.state.orderId}}</i>
          <span>order &nbsp; total:</span>
          <i>{{this.$store.state.total | mycurrency("$")}}</i>
        </p>
      </dd>
    </dl>
    <div class="router">
      <router-link to="/cart">CART LIST</router-link>
      <router-link to="/">GOODS LIST</router-link>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: "confirmationlist",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
      getlist(){

      }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
      this.getlist()
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less' scoped>
/*@import url(); 引入公共css类*/
.confirmationlist {
  width: 1300px;
  margin: 0 auto;
  margin-bottom: 150px;
      text-align: center;
  dl {
    height: 430px;
    dt {
      height: 300px;
      img {
        margin-top: 75px;
        width: 150px;
        height: 150px;
      }
    }
    dd {
      font-size: 16px;
      p {
        height: 25px;
        line-height: 25px;
      }
      p:last-child {
        height: 50px;
        color: #999;
        line-height: 50px;
      }
    }
  }
  .router{
      a{
          width: 150px;
          margin: 10px;
          display: inline-block;
          height: 30px;
          border: 1px solid red;
          line-height: 30px;
          color: red;
      }
  }
}
</style>