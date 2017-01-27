import Vue from 'vue'
import VueRouter from 'vue-router'
import components from './components'
Vue.use(VueRouter);
const router = new VueRouter({
    routes: [
        { path: '/', component: components['form-form'], name: 'home' },
        { path: '/:id/edit', component: components['form-edit'], name: 'form.edit' },
    ]
})

export default router
