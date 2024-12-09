import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import JobView from "@/views/JobView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import OneJobView from "@/views/OneJobView.vue";
import AddJobView from "@/views/AddJobView.vue";
import editJobView from "@/views/editJobView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/jobs',
            name: 'jobs',
            component: JobView,
        },
        {
            path: '/jobs/:id',
            name: 'job',
            component: OneJobView,
        },
        {
            path:'/jobs/add',
            name: 'add-job',
            component: AddJobView
        },
        {
            path:'/jobs/edit/:id',
            name: 'edit-job',
            component: editJobView
        },
        {
            path: '/:catchAll(.*)',
            name: 'not-found',
            component: NotFoundView,
        },
    ]

});

export default router;