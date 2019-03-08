<template>
  <div class="model">
    <div class="wrap">
      <p class="clone" @click="clone">
        <span class="iconfont icon-guanbi"></span>
      </p>
      <p class="title">
        <slot name="slot1"></slot>
      </p>
      <p class="btn">
        <slot name="slot2"></slot>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    clone() {
      console.log("关闭");
      this.$emit("clone"); //通知父组件关闭模态框
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {}
};
</script>
<style lang='less' scoped>
/*@import url(); 引入公共css类*/
.model {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  .wrap {
    padding: 20px;
    width: 450px;
    height: 200px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .clone {
      text-align: right;
    }
    .title {
      text-align: center;
      margin: 50px 0;
      font-size: 24px;
      .iconfont {
        font-size: 28px;
        color: #adc;
      }
    }
  }
  .btn {
    display: flex;
    justify-content: space-around;
    button ,a{
      text-align: center;
      line-height: 40px;
      width: 150px;
      height: 40px;
      background: red;
      color: #fff;
      font-weight: 700;
    }
  }
}
</style>