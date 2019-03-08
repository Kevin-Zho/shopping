<template>
  <div class="myhead">
    <denglu @suc="suc" @clone="clone" v-show="denglumodel"></denglu>
    <router-link to="/echarts">
      <div class="left">点击查看图表</div>
    </router-link>
    <div class="right">
      <div class="suc" v-show="!isdenglu">
        <span>{{username}}</span>
        <span @click="tuichu">退出</span>
        <router-link to="/cart">
        <span class="iconfont icon-gouwuche">
          <i>{{number}}</i>
        </span>
        </router-link>
      </div>
      <div class="nosuc" v-show="isdenglu" @click="denglu">请登录</div>
    </div>
  </div>
</template>

<script>
import denglu from "../components/denglu";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    denglu
  },
  data() {
    //这里存放数据
    return {
      isdenglu: true, //是否登录状态
      denglumodel: false, //登录模态框默认隐藏,
      username: "", //用户名
      number: 0 //购物车数量
    };
  },
  //方法集合
  methods: {
    
    getgouwucheshuliang() {
      //获取购物车数量
      this.axios.get("/users/getCartCount").then(res => {
        // console.log(res);
        this.number = res.data.result;
      });
    },
    clone(){
      this.denglumodel = false;
    },
    suc(name) {
      //子组件发送的登录数据
      // console.log(name)
      this.username = name;
      this.denglumodel = false;
      this.isdenglu = false;
      this.getgouwucheshuliang();
    },
    denglu() {
      //登录
      this.denglumodel = true;
      // this.axios.post("/users/login",{}).then((res)=>{
      //   console.log(res)
      // })
    },
    tuichu() {
      this.axios.post("/users/logout").then(res => {
        if (res.data.status == 0) {
          this.isdenglu = true;
        }
        console.log(res);
      });
    },
    yanzheng() {
      //验证登录状态
      this.axios.get("/users/checkLogin").then(res => {
        // console.log(res);
        if (res.data.status == 0) {
          this.isdenglu = false;
          this.username = res.data.result;
          this.getgouwucheshuliang();
        }
      });
    }
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // this.getgouwucheshuliang();
    this.yanzheng();
    this.bus.$on("add", ()=> {
      this.getgouwucheshuliang();
    });
    this.bus.$on("denglu", ()=> {
      this.denglu();
    });
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    
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
.myhead {
  width: 1300px;
  margin: 0 auto;
  height: 60px;
  line-height: 60px;
  padding: 0 50px;
  font-size: 20px;
  .left {
    float: left;
  }
  .right {
    float: right;
    .iconfont {
      position: relative;
      font-size: 20px;
      i {
        position: absolute;
        // display: inline-block;
        top: -50%;
        right: -50%;
        width: 18px;
        height: 18px;
        background: red;
        font-size: 10px;
        line-height: 18px;
        text-align: center;
        border-radius: 50%;
        color: #fff;
      }
    }
  }
}
</style>