import Vue from 'vue'
import router from './router'
import components from './components'

for(var component in components) {
    Vue.component(component, components[component])
}

const app = new Vue({
    router,
    render: h => h(components['form-app']),
    components: components,
}).$mount('#app');
