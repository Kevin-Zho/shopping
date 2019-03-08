<template>
  <div class="denglu">
    <div class="wrap">
      
      <h2><span class="iconfont icon-guanbi" @click="clone"></span>请登录</h2>
      <p>
        <span class="iconfont icon-kefuyouxian"></span>
        <input type="text" v-model="username">
      </p>
      <p>
        <span class="iconfont icon-zitiyulan"></span>
        <input type="password" v-model="password">
      </p>
      <button @click="denglu">登录</button>
      <span class="act">{{tit}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "admin",
      password: 123456,
      tit: ""
    };
  },
  methods: {
    clone(){
      this.$emit("clone")
    },
    denglu() {
      if (this.username == "" || this.password == "") {
        this.tit = "用户名或密码不能为空";
      } else {
        this.tit = "";
        this.axios
          .post("/users/login", {
            userName: this.username,
            userPwd: this.password
          })
          .then(res => {
              if(res.data.status == 0){
                  this.$emit("suc",res.data.result.userName)
              }
            console.log(res);
          });
      }
    }
  }
};
</script>
<style lang='less' scoped>
.denglu {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  .wrap {
    padding: 20px;
    width: 500px;
    height: 300px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    p {
      position: relative;
      span {
        position: absolute;
        color: #564;
        font-size: 18px;
        left: 5px;
        top: 50%;
        transform: translate(0%, -50%);
      }
      input {
        width: 100%;
        height: 50px;
        border: 1px solid #ccc;
        text-indent: 1.5em;
      }
    }
    button {
      width: 100%;
      background: #00f;
      color: #fff;
      height: 50px;
      border-radius: 5px;
    }
    .act {
      color: red;
    }
    .iconfont{
      float: right;
    }
  }
}
</style>