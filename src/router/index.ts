import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    component: () =>
      import(
        /* webpackChunkName: "login" */ "../views/authorization/LoginView.vue"
      ),
    meta: { guest: true, title: "Login" },
  },
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { requiresAuth: true },
    redirect: "/calendar",
    children: [
      {
        path: "/calendar",
        name: "calendar",
        component: () =>
          import(
            /* webpackChunkName: "calendar" */ "../views/CalendarView.vue"
          ),
        meta: { access: "calendar", title: "Calendar" },
      },
      {
        path: "/:pathMatch(.*)*",
        redirect: "/calendar",
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
