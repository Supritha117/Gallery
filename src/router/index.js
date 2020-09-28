import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Gallery")
    },
    {
      path: "/gallery",
      name: "gallery",
      component: () => import("@/views/Gallery")
    },
    {
      path: "/task_manager",
      name: "TaskList",
      component: () => import("@/views/TaskList")
    },
    {
      name: "newTask",
      path: "/task_manager/new",
      component: () => import("@/views/CreateTask")
    },
    {
      name: "EditTask",
      path: "/task_manager/edit/:id",
      component: () => import("@/views/EditTask"),
    },
    {
      name: "NF",
      path: "/404",
      component: () => import("@/views/NotFound")
    },
    {
      name: "oneTask",
      path: "/task_manager/one/:id",
      component: () => import("@/views/OneTask")
    }
  ]
});
