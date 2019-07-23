import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      component: require("../components/organisms/TestPage.vue").default,
      name: "test-page",
      path: "/",
    },
    {
      component: require("../components/organisms/MailPage.vue").default,
      name: "mail-page",
      path: "/mail",
    },
    {
      path: "*",
      redirect: "/",
    },
  ],
});
