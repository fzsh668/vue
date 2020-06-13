import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "login",
      component: resolve =>
          require(["../views/login/index.vue"], resolve),
      meta: { title: "登录" }
    },
    {
      path: "/register",
      name: "register",
      component: resolve =>
          require(["../views/register/index.vue"], resolve),
      meta: { title: "注册" }
    },
    {
      path: "/index",
      name: "index",
      component: resolve =>
          require(["../views/index/index.vue"], resolve),
      meta: { title: "首页" }
    },
    {
      path: "/index/person",
      name: "person",
      component: resolve =>
          require(["../views/index/person/index.vue"], resolve),
      meta: { title: "人员组织" }
    },
    {
      path: "/index/reward",
      name: "reward",
      component: resolve =>
          require(["../views/index/reward/index.vue"], resolve),
      meta: { title: "奖励" }
    },
    {
      path: "/index/record",
      name: "record",
      component: resolve =>
          require(["../views/index/record/index.vue"], resolve),
      meta: { title: "资源录入" }
    },
   {
      path: "/index/phone/index",
      name: "phone",
      component: () => import("@/views/index/phone/index.vue"),
      meta: { title: "留电" }
    },

        {
          path: "/index/phone/phoneInsert",
          name: "添加留电",
          component: resolve =>
              require(["@/views/index/phone/insert.vue"], resolve),
          meta: { title: "添加留电"}
        },
      {
          path: "/index/phone/updata",
          name: "留电编辑",
          component: () => import("@/views/index/phone/updata.vue"),
          meta: { title: "留电编辑" }
        },
    {
      path: "/index/source",
      name: "source",
      component: resolve =>
          require(["../views/index/source/index.vue"], resolve),
      meta: { title: "资源" }
    },
    {
      path: "/index/source/sourceDetail",
      name: "sourceDetail",
      component: resolve =>
          require(["../views/index/source/sourceDetail.vue"], resolve),
      meta: { title: "查看资源" }
    },
    {
      path: "/index/sign",
      name: "sign",
      component: resolve =>
          require(["../views/index/sign/index.vue"], resolve),
      meta: { title: "签到" }
    },
      {
          path: "/index/sign/all",
          name: "所有签到",
          component: resolve =>
              require(["../views/index/sign/all.vue"], resolve),
          meta: { title: "所有签到" }
      },
      {
          path: "/index/sign/detail",
          name: "签到详情",
          component: resolve =>
              require(["../views/index/sign/detail.vue"], resolve),
          meta: { title: "签到详情" }
      },
    {
      path: "/search",
      name: "search",
      component: resolve =>
          require(["../views/search/index.vue"], resolve),
      meta: { title: "搜索" }
    },
    {
      path: "/statistics",
      name: "statistics",
      component: resolve =>
          require(["../views/statistics/index.vue"], resolve),
      meta: { title: "统计" }
    },
    {
      path: "/statistics/setstatistics",
      name: "setstatistics",
      component: resolve =>
          require(["../views/statistics/setstatistics.vue"], resolve),
      meta: { title: "统计设置" }
    },
    {
      path: "/set",
      name: "set",
      component: resolve =>
          require(["../views/set/index.vue"], resolve),
      meta: { title: "设置" }
    },
    {
    path: "/set/myreward",
    name: "myreward",
    component: resolve =>
        require(["../views/index/reward/index.vue"], resolve),
    meta: { title: "我的奖励" }
  },
      {
          path: "/set/mycost",
          name: "mycost",
          component: resolve =>
              require(["../views/set/mycost.vue"], resolve),
          meta: { title: "我的费用" }
      },
      {
          path: "/set/updatauser",
          name: "updatauser",
          component: resolve =>
              require(["../views/set/updatauser.vue"], resolve),
          meta: { title: "修改信息" }
      },
  ]
})
