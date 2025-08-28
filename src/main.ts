import App from "./App.vue";

import { createApp } from "vue";

import { router } from "./router/index";

import "@/lib/assets/style.scss";
createApp(App).use(router).mount("#app");
