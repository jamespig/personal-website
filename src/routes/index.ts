import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("../pages/index.vue"),
    meta: { title: "Homepage-JamesPig" },
  },
  {
    path: "/portfolio",
    name: "portfolio",
    component: () => import("../pages/portfolio/index.vue"),
    meta: { title: "My Portfolio-JamesPig" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  const defaultTitle = "JamesPig";
  document.title = (to.meta.title as string) || defaultTitle;
  next();
});

export default router;
