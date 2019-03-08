<template>
<div class='echarts'> 
   <router-link to="/">
      <div class="left">返回首页</div>
    </router-link>
  <div id="main" style="width: 600px;height:400px;"></div>

</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
// import echarts from 'echarts'
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// // 引入柱状图
// require('echarts/lib/chart/bar');
// // 引入提示框和标题组件
// require('echarts/lib/component/tooltip');
// require('echarts/lib/component/title');




export default {
//import引入的组件需要注入到对象中才能使用

components: {},
data() {
//这里存放数据
return {
  data:[]
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
  getdatalist(){

    this.axios
        .get("/goods/list?page=1&pageSize=17&sort=1&priceLevel=all")
        .then(res => {
          console.log(res);
            // this.data = res.data.result.list
            this.data = res.data.result.list.map((item)=>{
                this.data.push(item.salePrice)
                // console.log('tag', '')
            })
          })
    }
    
  },
//生命周期 - 创建完成（可以访问当前this实例）
created() {
  this.getdatalist();
  },
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
  var myChart = echarts.init(document.getElementById('main'));
  myChart.setOption({
      title: {
          text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
          data: ['all', '0-100', '100-500', '500-1000',"1000-5000"]
      },
      yAxis: {},
      series: [{
          name: '数量',
          type: 'bar',
          data: [17, 3, 2, 3, 9]
      }]
  });
},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
/*@import url(); 引入公共css类*/

</style>