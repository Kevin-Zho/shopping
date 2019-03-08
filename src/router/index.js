import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import cart from '@/pages/cart'

import address from '@/pages/address'
import order from '@/pages/order'
import confirmation from '@/pages/confirmation' 
import echarts from '@/pages/echarts'   //图表


Vue.use(Router)

export default new Router({ 
  scrollBehavior(to, from, savePosition) {    //滚动复位
    if (savePosition) {
      setTimeout(() => {
        window.scrollTo(savePosition.x, savePosition.y);
      }, 200);
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  },
  routes: [{
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/index',
      name: 'index',
      component: index
    }, {
      path: '/cart',
      name: 'cart',
      component: cart
    }, {
      path: '/address',
      name: 'address',
      component: address
    }, {
      path: '/order',
      name: 'order',
      component: order
    }, {
      path: '/confirmation',
      name: 'confirmation',
      component: confirmation
    }, {
      path: '/echarts',   //图表
      name: 'echarts',
      component: echarts
    }
  ]
})
