import Vue from "vue";
import swal from "sweetalert";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.vue";
import router from "./router";
import "./plugins";
import store from "./store/index";
import "./assets/css/media.css";
import "./assets/css/app.scss";
import "./assets/theme/fonts/fonts/font-awesome.min.css";
import "./assets/theme/plugins/iconfonts/plugin.css";
import VueSweetalert2 from "vue-sweetalert2";
Vue.use(VueSweetalert2);
router.beforeEach((to, from, next) => {
  if (to) {
    console.log(to);
    next();
  }
});

new Vue({
  router,
  store,
  swal,
  render: (h) => h(App)
}).$mount("#app");
