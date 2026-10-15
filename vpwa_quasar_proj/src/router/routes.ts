import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("@/pages/IndexPage.vue") },
      { path: "second", component: () => import("@/pages/SecondPage.vue") },
      { path: "register", component: () => import("@/pages/Register.vue") },
      { path: "profile", component: () => import("@/pages/Profile.vue") },
      { path: "login", component: () => import("@/pages/Login.vue") }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("@/pages/ErrorNotFound.vue")
  }
];

export default routes;
