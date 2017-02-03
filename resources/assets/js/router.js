import Vue from 'vue'
import VueRouter from 'vue-router'
import components from './components'
Vue.use(VueRouter);
const router = new VueRouter({
    routes: [
        { path: '/', component: components['form-form'], name: 'form' },
        { path: '/login', component: components['form-login'], name: 'auth.login' },
        { path: '/:id/edit', component: components['form-edit'], name: 'form.edit' },
        { path: '/register', component: components['form-register'], name: 'auth.register' }
    ]
})

export default router
