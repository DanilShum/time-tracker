import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    children: [
      {
        path: "/calendar",
        name: "calendar",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/CalendarView.vue"),
        meta: { access: "calendar", title: "Calendar" },
      },
      {
        path: "*",
        redirect: "/",
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
