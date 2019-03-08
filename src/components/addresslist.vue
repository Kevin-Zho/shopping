<template>
  <div class="addresslist">
    <div class="top">
      <h1>SHIPPING ADDRESS</h1>
      <div class="wrap">
        <div
          v-for="item of datalist"
          :key="item.addressId"
          :class="{'cur':item.isDefault}"
          ref="addressfor"
          @click="btnaddress($event,item.addressId)"
        >
          <p>{{item.userName}}</p>
          <p>{{item.streetName}}</p>
          <p>{{item.tel}}</p>
          <p>
            <span v-show="item.isDefault" @click="defaults(item.addressId)">Default address</span>
            <span v-show="!item.isDefault" @click="defaults(item.addressId)">address</span>
            <span class="iconfont icon-shanchu" @click="del(item.addressId)"></span>
          </p>
        </div>
      </div>
    </div>
    <div class="top bom">
      <h1>SHIPPING HETHOD</h1>
      <div class="wrap">
        <div class="dizhi">
          <p>Standard shipping</p>
          <p>Free</p>
          <p>dfghdfgh dfgh fdgh dfgh dfgh dfgh dsfd</p>
          <p>dfklg jd f ddfdfkldsk dfg dflg dg dfdgdf</p>
        </div>
      </div>
    </div>
    <button @click="btnnext">NEXT</button>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: "addresslist",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      datalist: []
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
      btnnext(){  //下一页
        this.$router.push("/order")
      },
    del(id) {
      this.axios.post("/users/delAddress", { addressId: id }).then(res => {
        if (res.data.status == "0") {
          this.getaddress();
        }
      });
    },
    defaults(id) {
      //默认地址设置
      this.axios.post("/users/setDefault", { addressId: id }).then(res => {
        if (res.data.status == "0") {
          this.getaddress();
        }
      });
    },
    btnaddress(evt, id) {
      //收货地址设置
      this.$store.commit("setAddressId", id); //触发vuex事件
      // {{this.$store.state.addressId}}//接收vuex事件
      //点击选中收货地址 循环去掉默认的class 在通过事件对象里的currentTarget设置class
      this.$refs.addressfor.forEach(ele => {
        ele.className = "";
      });
      // evt .target   始终指向用户点击的dom
      // evt.currentTarget  click事件绑定的dom
      evt.currentTarget.className = "cur";
    },
    getaddress() {
      this.axios.get("/users/addressList").then(res => {
        this.datalist = res.data.result;
        var addressId = 0;      //储存默认地址id   通过接口返回的字段
        res.data.result.forEach(item => {
          if (item.isDefault) {
            addressId = item.addressId;
          }
        });
        this.$store.commit("setAddressId",addressId);
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getaddress();
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
.addresslist {
  width: 1300px;
  margin: 0 auto;
  margin-bottom: 150px;
  h1 {
    margin-top: 30px;
    font-size: 20px;
    height: 60px;
    line-height: 60px;
  }
  .wrap {
    display: flex;
    flex-wrap: wrap;
    div {
      margin-right: 30px;
      padding: 20px;
      width: 260px;
      height: 120px;
      border: 1px solid #ccc;
      p {
        height: 25px;
        line-height: 25px;
      }
      p:nth-child(2) {
        margin-bottom: 20px;
      }
      p:nth-child(4) {
        display: flex;
        justify-content: space-between;
        cursor: pointer;
        .iconfont {
          font-size: 18px;
        }
      }
      &:last-child {
        margin-right: 0;
      }
    }
    .cur {
      border: 2px solid orange;
    }
  }
  .bom {
    .wrap {
      .dizhi {
        border: 2px solid orange;
        p:nth-child(1) {
          font-size: 18px;
        }
        p:nth-child(2) {
          font-size: 18px;
          font-weight: 800;
        }
        p:nth-child(3),
        p:nth-child(4) {
          color: #999;
        }
      }
    }
  }
  button {
    float: right;
    width: 180px;
    height: 40px;
    color: #fff;
    background: red;
  }
}
</style>