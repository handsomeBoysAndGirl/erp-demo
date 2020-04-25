import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login'},
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home.vue'),
    meta: {
      title: '首页',
      icon: 'dashboard',
      noCache: true
    },
    children: [{
        path: "/danju",
        name: "danju",
        component: () => import('../views/danju/Danju.vue'),
        meta: {
          title: '采购',
          icon: 'dashboard',
          noCache: true
        },
        children: [{
          path: "/",
          name: "danjulist",
          component: () => import('../views/caigou/DanjuList.vue'),
          meta: {
            title: '采购计划单列表',
            icon: 'dashboard',
            noCache: true
          }
        }, {
          path: "/info/:di_id",
          name: "danjuinfo",
          component: () => import('../views/caigou/DanjuInfo.vue'),
          meta: {
            title: '采购计划单详情',
            icon: 'dashboard',
            noCache: true
          }
        },
        {
          path: "/saleList",
          name: "saleList",
          component: () => import('../views/sale/allsale.vue'),
          meta: {
            title: '销售单据一览',
            icon: 'dashboard',
            noCache: true
          }
        }]
      },
      {
        path: "/fillIn",
        name: "fillIn",
        component: () => import('../views/caigou/FillIn.vue'),
        meta: {
          title: '填写采购计划单',
          icon: 'dashboard',
          noCache: true
        }
      },
      {
        path: "/newsale",
        name: "newsale",
        component: () => import('../views/sale/newSale.vue'),
        meta: {
          title: '填写销售订单',
          icon: 'dashboard',
          noCache: true
        }
      },
      {
        path: "/caogao",
        name: "caogao",
        component: () => import('../views/danju/CaoGao.vue'),
        meta: {
          title: '草稿箱',
          icon: 'dashboard',
          noCache: true
        }
      },{
        path: "/fapiao",
        name: "fapiao",
        component: () => import('../views/fapiao/fapiao.vue'),
        meta: {
          title: '发票中心',
          icon: 'dashboard',
          noCache: true
        }
      },{
        path: "/stock",
        name: "stock",
        component: () => import('../views/stock/psk_stock.vue'),
        meta: {
          title: '库存查询',
          icon: 'dashboard',
          noCache: true
        }
      },{
        path: "/newfapiao/",
        name: "newfapiao",
        component: () => import('../views/fapiao/newfapiao.vue'),
        meta: {
          title: '新开发票',
          icon: 'dashboard',
          noCache: true
        }
      },{
        path: '/money',
        name: 'money',
        component: () => import( '../views/money/main.vue'),
        meta: {
          title: '虚拟钱包',
          icon: 'dashboard',
          noCache: true
        }
      },
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import( '../views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( '../views/login/Login.vue'),
    meta: {
      keepAlive: false
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  // const isLogin = localStorage.tsToken || sessionStorage.tsToken ? true: false;
  // const isLogin = sessionStorage.isLogin ? true: false;
  // if (to.path == "/login" || to.path == "/password") {
  //   next();
  // } else {
  //   isLogin ? next(): next("/login")
  // }
  next()
})

export default router