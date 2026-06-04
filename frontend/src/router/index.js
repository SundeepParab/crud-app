import { createRouter, createWebHistory } from "vue-router";

import Login from "../views/Login.vue";
import Users from "../views/Users.vue";

const routes = [
    {
        path: "/",
        component: Login
    },
    {
        path: "/users",
        component: Users
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {

    const token = localStorage.getItem("token");

    if (to.path === "/") {
        next();
        return;
    }

    if (!token) {
        next("/");
        return;
    }

    next();
});

export default router;