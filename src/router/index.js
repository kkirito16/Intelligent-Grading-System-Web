import Vue from "vue"
import VueRouter from "vue-router"
import Layout from "../layout"

Vue.use(VueRouter)

const routes = [
  { name: "login", path: "/login", meta: { title: "登录 - 慧阅智能阅卷平台" }, component: () => import("../views/login/index"), hidden: true },
  { name: "/", path: "/", component: Layout, redirect: "/index", hidden: false, children: [
      { name: "index", path: "/index", meta: { title: "首页 - 慧阅智能阅卷平台" }, component: () => import("../views/index/index") },
  ]},
  { name: "/grading", path: "/grading", component: Layout, redirect: "/grading/index", hidden: false, children: [
      { name: "/grading/index", path: "/grading/index", meta: { title: "阅卷 - 慧阅智能阅卷平台" }, component: () => import("../views/grading/index") }
  ]},
  { name: "/analysis", path: "/analysis", component: Layout, redirect: "/analysis/index", hidden: false, children: [
      { name: "/analysis/index", path: "/analysis/index", meta: { title: "数据分析 - 慧阅智能阅卷平台" }, component: () => import("../views/analysis/index") }
  ] }
]

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
 return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({ routes })

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '慧阅智能阅卷平台'; // 如果路由中设置了标题，则使用设置的标题，否则使用默认标题
  next();
});

export default router