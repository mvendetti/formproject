require('./bootstrap');

import App from './components/App.vue'
import Nav from './components/Nav.vue'
import Form from './components/Form.vue'
import Login from './components/auth/Login.vue'
import FormEdit from './components/FormEdit.vue'
import Register from './components/auth/Register.vue'

Vue.component('form-app', App, { name: 'form-app' })
Vue.component('form-nav', Nav, { name: 'form-nav' })
Vue.component('form-form', Form, { name: 'form-form' })
Vue.component('form-login', Login, { name: 'form-login' })
Vue.component('form-edit', FormEdit, { name: 'form-edit' })
Vue.component('form-register', Register, { name: 'form-register' })

const router = new VueRouter({
    // mode: 'history',
    routes: [
        { path: '/', component: Form, name: 'form' },
        { path: '/login', component: Login, name: 'auth.login' },
        { path: '/:id/edit', component: FormEdit, name: 'form.edit' },
        { path: '/register', component: Register, name: 'auth.register' }
    ]
})

new Vue({
    router,
}).$mount('#spapp');
