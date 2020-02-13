import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/home',
    name: 'home',
    component: Home,
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
        path: "/caogao",
        name: "caogao",
        component: () => import('../views/danju/CaoGao.vue'),
        meta: {
          title: '草稿箱',
          icon: 'dashboard',
          noCache: true
        }
      },
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/login/Login.vue')
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