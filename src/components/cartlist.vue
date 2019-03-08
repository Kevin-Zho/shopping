<!--  -->
<template>
  <div class="cartlist">
    <model v-if="ismodel1" @clone="jixu">
      <template slot="slot1">
        <span class="iconfont icon-kongxinduigou"></span>
        购物车空空如也，挑选心仪的商品吧！
      </template>
      <template slot="slot2">
        <router-link to="/">去购物</router-link>
      </template>
    </model>
    <model v-if="ismodel2" @clone="jixu">
      <template slot="slot1">
        <span class="iconfont icon-kongxinduigou"></span>
        购物车商品不能在减了！
      </template>
      <template slot="slot2">
        <button @click="jixu">确定</button>
      </template>
    </model>
    <model v-if="ismodel3" @clone="jixu">
      <template slot="slot1">
        <span class="iconfont icon-kongxinduigou"></span>
        在确定要删除心爱的商品吗？
      </template>
      <template slot="slot2">
        <button @click="yesdel">确定</button>
      </template>
    </model>
     <model v-if="ismodel4" @clone="jixu">
      <template slot="slot1">
        <span class="iconfont icon-kongxinduigou"></span>
        没有选择需要购买的商品！
      </template>
      <template slot="slot2">
        <button @click="jixu">确定</button>
      </template>
    </model>
    <h1>MY &nbsp; CART</h1>
    <div class="top">
      <span>ITEMS</span>
      <span>PRICE</span>
      <span>QUANITY</span>
      <span>SUBTOTAL</span>
      <span>EDIT</span>
    </div>
    <ul>
      <li v-for="item of datalist" :key="item.productId">
        <p>
          <span :class="item.checked=='1'?'cur':''" @click="change($event,item)">√</span>
        </p>
        <p>
          <img :src="'static/'+ item.productImage">
        </p>
        <p>{{item.productName}}</p>
        <p>{{item.salePrice | mycurrency("$")}}</p>
        <p>
          <span @click="change($event,item)">-</span>
          <span>{{item.productNum}}</span>
          <span @click="change($event,item)">+</span>
        </p>
        <p>{{item.salePrice*item.productNum | mycurrency("$")}}</p>
        <p @click="del(item.productId)">
          <span class="iconfont icon-shanchu"></span>
        </p>
      </li>
    </ul>
    <div class="bom">
      <p>
        <span :class="{'cur':checked}" @click="btnchenked">√</span>
      </p>
      <p>Select all</p>
      <p>Item Total:</p>
      <p>{{zongjia | mycurrency("$")}}</p>
      <button @click="next">CHECKOUT</button>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

import model from "./model";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: { model },
  data() {
    //这里存放数据
    return {
      datalist: [], // 购物车商品数据
      ismodel1: false, //提示购物车空空
      ismodel2: false, //提示购物车商品不能在减少
      ismodel3: false, //是否删除商品提示
      ismodel4: false, //提交下一页之前判断有没有选择商品
      id: "" //保存删除商品的Id
    };
  },
  //监听属性 类似于data概念
  computed: {
    checked() {
      //计算是否是全选状态
      var yes = true;
      this.datalist.forEach(element => {
        if (element.checked == "0") {
          yes = false;
        }
      });
      return yes;
    },
    zongjia() {
      //总价计算
      var jia = 0;
      this.datalist.forEach(element => {
        if (element.checked == "1") {
          jia += element.productNum * element.salePrice;
        }
      });
      return jia;
    }
  },
  //方法集合
  methods: {
    next() {
      var jia = 0;
      this.datalist.forEach(element => {
        if (element.checked == "1") {
          jia += parseInt(element.productNum);   
        }
      });
      if(jia == 0){
          this.ismodel4 = true
      }else{
          this.$router.push("/address")
      }
    },
    btnchenked(evt) {
      //全选按钮
      var quan = true;
      if (evt.target.className.indexOf("cur") > -1) {
        quan = false;
      }
      console.log(quan);
      this.axios
        .post("/users/editCheckAll", {
          checkAll: quan
        })
        .then(res => {
          console.log(res);
          if (res.data.result == "suc") {
            this.datalist.forEach((v, i) => {
              v.checked = quan ? "1" : "0";
            });
          }
        });
    },
    yesdel() {
      //确定删除
      this.axios
        .post("/users/cartDel", {
          productId: this.id
        })
        .then(res => {
          console.log(res);
          if (res.data.result == "suc") {
            this.ismodel3 = false;
            this.bus.$emit("add");
            this.getdatalist();
          }
        });
    },
    del(id) {
      //删除弹出提示
      this.id = id;
      this.ismodel3 = true;
    },
    jixu() {
      //关闭模态框
      this.ismodel1 = false;
      this.ismodel2 = false;
      this.ismodel3 = false;
      this.ismodel4 = false;
    },
    change(evt, item) {
      // 购物车加减选中变更

      if (evt.target.innerHTML == "-") {
        //减购物车商品数量
        item.productNum--;
        if (item.productNum < 1) {
          item.productNum = 1;
          this.ismodel2 = true;
        }
      } else if (evt.target.innerHTML == "+") {
        //加购物车商品数量
        item.productNum++;
      } else {
        //单选
        console.log(item);
        if (item.checked == "0") {
          item.checked = "1";
        } else {
          item.checked = "0";
        }
      }
      this.axios
        .post("/users/cartEdit", {
          checked: item.checked,
          productId: item.productId,
          productNum: item.productNum
        })
        .then(res => {
          console.log(res);
          if (res.data.result == "suc") {
            this.bus.$emit("add");
          }
        });
    },
    getdatalist() {
      //获取购物车数据
      this.axios.get("/users/cartList").then(res => {
        this.datalist = res.data.result;
        if (this.datalist.length == 0) {
          this.ismodel1 = true;
        }
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getdatalist();
  }
};
</script>
<style lang='less' scoped>
/*@import url(); 引入公共css类*/
.cartlist {
  width: 1300px;
  margin: 0 auto;

  h1 {
    height: 60px;
    line-height: 60px;
    font-size: 20px;
    font-weight: 700;
  }
  .bom {
    height: 40px;
    background: #fff;
    line-height: 40px;
    text-align: center;
    margin-top: 30px;
    margin-bottom: 50px;
    display: flex;
    button {
      margin-left: 100px;
      background: red;
      color: #fff;
      width: 100px;
    }
    p:nth-child(4) {
      width: 100px;
      color: red;
      font-weight: 800;
    }
    p:nth-child(3) {
      margin-left: 750px;
    }
    p:nth-child(1) {
      width: 80px;
      cursor: pointer;
      span {
        display: inline-block;
        width: 20px;
        line-height: 20px;
        text-align: center;
        height: 20px;
        border-radius: 50%;
        border: 1px solid #ccc;
        font-family: "黑体";
      }
      .cur {
        background: gold;
        color: #fff;
      }
    }
  }
  .top {
    height: 40px;
    background: #666;
    line-height: 40px;
    color: #fff;
    span {
      width: 196px;
      display: inline-block;
      text-align: center;
    }
    span:nth-child(1) {
      width: 500px;
    }
  }
  ul {
    li {
      display: flex;
      height: 150px;
      border: 1px solid #ccc;
      border-top: none;
      background: #fff;
      line-height: 150px;
      p {
        text-align: center;
        img {
          width: 80px;
          height: 80px;
          border: 1px solid #ccc;
        }
      }
      p:nth-child(7) {
        margin-left: 150px;
        cursor: pointer;
      }
      p:nth-child(6) {
        margin-left: 100px;
        width: 90px;
        color: red;
      }
      p:nth-child(5) {
        margin-left: 110px;
        span {
          margin-left: -4px;
          display: inline-block;
          cursor: pointer;
          width: 35px;
          height: 31px;
          background: #eee;
          line-height: 31px;
        }
        span:nth-child(2) {
          background: #fff;
          border-top: 1px solid #eee;
          border-bottom: 1px solid #eee;
          box-sizing: border-box;
        }
      }
      p:nth-child(4) {
        margin-left: 210px;
        width: 80px;
      }
      p:nth-child(3) {
        width: 150px;
        font-weight: 700;
        margin: 0 20px;
        text-align: left;
      }
      p:nth-child(1) {
        width: 80px;
        cursor: pointer;
        span {
          display: inline-block;
          width: 20px;
          line-height: 20px;
          text-align: center;
          height: 20px;
          border-radius: 50%;
          border: 1px solid #ccc;
          font-family: "黑体";
        }
        .cur {
          background: gold;
          color: #fff;
        }
      }
    }
  }
}
</style>