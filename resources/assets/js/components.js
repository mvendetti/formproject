import Vue from 'vue'
import App from './components/App.vue'
import Nav from './components/Nav.vue'
import Form from './components/Form.vue'
import Login from './components/auth/Login.vue'
import FormEdit from './components/FormEdit.vue'
import Register from './components/auth/Register.vue'

const components = {
    'form-app' : App,
    'form-nav' : Nav,
    'form-form' : Form,
    'form-login' : Login,
    'form-edit' : FormEdit,
    'form-register' : Register
}

export default components
