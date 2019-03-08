<template>
  <div class="indexlist">
    <model v-if="ismodel1" @clone="jixu">
      <template slot="slot1">
        <span class="iconfont icon-kongxinduigou"></span>
        加入购物车成功
      </template>
      <template slot="slot2">
        <button @click="jixu">继续购物</button>
        <button @click="chakan">查看购物车</button>
      </template>
    </model>
    <model v-if="ismodel2" @clone="jixu">
      <template slot="slot1">
        <span class="iconfont icon-bumanyi"></span>
        添加购物车失败，请先登录！
      </template>
      <template slot="slot2">
        <button @click="denglu">去登陆</button>
      </template>
    </model>
    <div class="top">
      <span>sort by</span>
      <span>default</span>
      <span @click="paixu">price</span>
      <span class="iconfont icon-zhixiang-qianjin" :class="sort==-1?'dao':''" @click="paixu"></span>
    </div>
    <div class="bottom">
      <div class="left">
        <p>PRICE</p>
        <P @click="btn('all')" :class="priceLevel=='all'?'active':''">ALL</P>
        <P @click="btn(0)" :class="priceLevel=='0'?'active':''">0.00 - 100.00</P>
        <P @click="btn(1)" :class="priceLevel=='1'?'active':''">100.00 - 500.00</P>
        <P @click="btn(2)" :class="priceLevel=='2'?'active':''">500.00 - 1000.00</P>
        <P @click="btn(3)" :class="priceLevel=='3'?'active':''">1000.00 - 5000.00</P>
      </div>
      <div class="right">
        <ul>
          <li v-for="item of datalist" :key="item.productId">
            <img :src="'static/'+item.productImage">
            <p>{{item.productName}}</p>
            <p>
              <!--全局过滤器在main.js文件里-->
              <span class="red">{{item.salePrice | mycurrency("$")}}</span>
            </p>
            <button @click="addshopping(item.productId)">加入购物车</button>
          </li>
        </ul>
      </div>
      <!-- 提供了一个执行 loadMore方法的时机 -->
      <div
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="20"
      >
        <p class="jiazaitit">{{tit}}</p>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

import model from "./model";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    model
  },
  data() {
    //这里存放数据
    return {
      datalist: [], //商品列表
      page: 1, //页码
      pageSize: 8, //每页请求数量
      sort: 1, //排序   1正序  -1倒叙
      priceLevel: "all", //区间价格 all所有
      tit: "正在加载...", //提示下拉加载
      busy: false, //默认触发下拉加载    true阻止触发
      ismodel1:false,
      ismodel2:false
    };
  },
  //方法集合
  methods: {
    denglu(){
      this.bus.$emit("denglu");
      this.ismodel2 = false;
    },
    jixu(){ //模态框继续购物
      this.ismodel1 = false;
      this.ismodel2 = false;
    },
    chakan(){ //模态框去购物车
      this.$router.push("/cart")
    },
    addshopping(id) {
        // console.log(id);

      this.axios.post("/goods/addCart",{
        productId:id
      }).then((res)=>{
        if(res.data.result == "suc"){
          this.ismodel1 = true;
          this.bus.$emit("add");
        }else{
          this.ismodel2 = true;
        }
        console.log(res);
        
      })
    },
    btn(num) {
      //区间价格
      this.page = 1;
      this.priceLevel = num;
      this.getdatalist();
      this.busy = false;
      this.tit = "正在加载...";
    },
    loadMore() {
      //插件提供的方法 默认触发下拉加载
      this.busy = true; //阻止触发下拉加载
      setTimeout(() => {
        this.page++;
        this.getdatalist("loadMore");
      }, 1000);
    },
    paixu() {
      //排序
      this.sort = this.sort == 1 ? -1 : 1;
      this.page = 1;
      this.getdatalist();
    },
    getdatalist(str) {
      //请求数据
      this.axios
        .get(
          "/goods/list?page=" +
            this.page +
            "&pageSize=" +
            this.pageSize +
            "&sort=" +
            this.sort +
            "&priceLevel=" +
            this.priceLevel
        )
        .then(res => {
          // console.log(res);
          if (str == "loadMore") {
            //如果是下拉加载就合并上一页的数据
            this.datalist = this.datalist.concat(res.data.result.list);
            if (res.data.result.list.length == 0) {
              ////如果是最后一页数据
              this.busy = true; //阻止触发下拉加载
              this.tit = "加载完成";
              setTimeout(() => {
                this.tit = "";
              }, 2000);
            } else {
              //否则继续触发下拉加载
              this.busy = false;
            }
          } else {
            //如果是第一次打开就是默认数据
            this.datalist = res.data.result.list;
          }
        });
    }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getdatalist();
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
.indexlist {
  width: 1300px;
  margin: 0 auto;
  .bottom {
    min-height: 800px;
    display: flex;
    flex-wrap: wrap;
    margin-top: 50px;
    .left {
      //   float: left;
      //   height: 100%;
      width: 280px;
      p {
        padding-left: 20px;
        box-sizing: border-box;
        height: 60px;
        width: 280px;
        line-height: 60px;
        border-left: 2px solid #ccc;
      }
      .active {
        border-left: 4px solid red;
      }
    }
    .right {
      //   float: left;
      width: 1020px;
      ul {
        li {
          border: 1px solid #ccc;
          background: #fff;
          box-sizing: border-box;
          float: left;
          width: 240px;
          margin-left: 15px;
          margin-bottom: 15px;
          img {
            width: 100%;
          }
          p {
            text-align: center;
            height: 40px;
            line-height: 40px;
            font-size: 18px;
            .red {
              color: red;
            }
          }
          button {
            width: 220px;
            background: red;
            color: #fff;
            margin: 10px;
            height: 40px;
          }
        }
      }
    }
  }
  .top {
    background: #fff;
    height: 80px;
    line-height: 80px;
    text-align: right;
    .iconfont {
      display: inline-block;
      transition: all 1s;
      transform: rotate(-90deg);
    }
    .dao {
      transition: all 1s;
      transform: rotate(90deg);
    }
  }
  .jiazaitit {
    margin-bottom: 50px;
    margin-left: 300px;
    font-size: 18px;
    color: red;
  }
}
</style>