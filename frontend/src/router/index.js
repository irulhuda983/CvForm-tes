import { createRouter, createWebHistory } from "vue-router"

const routes = [
  {
    path: "/",
    name: "CvForm",
    meta: { public: true },
    component: () => import("@/pages/CvForm.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

export default router