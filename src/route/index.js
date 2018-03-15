import Vue from 'vue'
import Router from 'vue-router'
import CPM from '../components/CPM/CPM'

Vue.use(Router)

let router = new Router({
    routes: [
        {
            path: '/',
            component: CPM
        }
    ]
});

export default router