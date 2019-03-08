<!--  -->
<template>
  <div class="orderlist">
    <h1>ORDER &nbsp; CONTENT</h1>
    <div class="top">
      <span>ORDER &nbsp; CONTENTS</span>
      <span>PRICE</span>
      <span>QUANITY</span>
      <span>SUBTOTAL</span>
    </div>
    <ul>
      <li v-for="item of datalist" :key="item.productId">
        <p>
          <img :src="'static/'+ item.productImage">
        </p>
        <p>{{item.productName}}</p>
        <p>{{item.salePrice | mycurrency("$")}}</p>
        <p>
          <span>×{{item.productNum}}</span>
          <span>In Stock</span>
        </p>
        <p>{{item.salePrice*item.productNum | mycurrency("$")}}</p>
      </li>
    </ul>
    <div class="bom">
      <p>
        <span>Item subtotal:</span>
        <span>{{100 | mycurrency("$")}}</span>
      </p>
      <p>
        <span>Shipping:</span>
        <span>{{100 | mycurrency("$")}}</span>
      </p>
      <p>
        <span>Discount:</span>
        <span>{{200 | mycurrency("$")}}</span>
      </p>
      <p>
        <span>tax:</span>
        <span>{{400 | mycurrency("$")}}</span>
      </p>
      <p>
        <span>Order total</span>
        <span>{{zongjia | mycurrency("$")}}</span>
      </p>

      <div>
        <span>PREVIOUS</span>
        <button @click="next">PROCEED &nbsp; TO &nbsp; PAYMENT</button>
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
  components: { model },
  data() {
    //这里存放数据
    return {
      datalist: [], // 购物车商品数据
      total: 0   //保存删除商品的Id
    };
  },
  //监听属性 类似于data概念
  computed: {
    zongjia() {
      //总价计算
      var jia = 0;
      this.datalist.forEach(element => {
        if (element.checked == "1") {
          jia += element.productNum * element.salePrice;
          this.total = jia 
        }
      });
      return jia;
    }
  },
  //方法集合
  methods: {
    next() {
      this.axios
        .post("/users/payMent", {
          addressId: this.$store.state.addressId,
          orderTotal:  this.total
        })
        .then(res => {
            if(res.data.status == "0"){
              // console.log(res)
              this.$store.commit("setOrder", [res.data.result.orderId,res.data.result.orderTotal])
              this.$router.push("/confirmation");
            }
        });
    },
    getdatalist() {
      //获取购物车数据/users/cartList  /users/cartList
      this.axios.get("/users/cartList").then(res => {
        res.data.result.forEach(item => {
          if (item.checked == "1") {
            this.datalist.push(item);
          }
        });
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
.orderlist {
  width: 1300px;
  margin: 0 auto;

  h1 {
    height: 60px;
    line-height: 60px;
    font-size: 20px;
    font-weight: 700;
  }
  .bom {
    margin-top: 30px;
    margin-bottom: 50px;
    text-align: right;
    p {
      height: 40px;
      line-height: 40px;
      color: #999;
      font-size: 16px;
      span:last-child {
        width: 120px;
        display: inline-block;
      }
    }
    button {
      margin-left: 100px;
      background: red;
      color: #fff;
      width: 100px;
    }
    p:nth-child(5) {
      span:last-child {
        color: red;
        font-size: 20px;
      }
    }
    div {
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
      font-size: 16px;
      button {
        width: 240px;
      }
      span {
        display: inline-block;
        width: 120px;
        height: 35px;
        text-align: center;
        line-height: 35px;
        border: 1px solid red;
        color: red;
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
      width: 700px;
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
      p:nth-child(5) {
        margin-left: 100px;
        width: 90px;
        color: red;
      }
      p:nth-child(4) {
        margin-left: 60px;
        width: 100px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        span {
          height: 31px;
          line-height: 31px;
        }
        span:nth-child(1) {
          background: #fff;
          width: 50px;
          border: 1px solid #eee;
          box-sizing: border-box;
        }
        span:nth-child(2) {
          color: red;
        }
      }
      p:nth-child(3) {
        margin-left: 380px;
        width: 180px;
      }
      p:nth-child(2) {
        width: 150px;
        font-weight: 700;
        margin: 0 20px;
        text-align: left;
      }
      p:nth-child(1) {
        width: 140px;
      }
    }
  }
}
</style>