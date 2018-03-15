import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './route'
import VeeValidate from 'vee-validate';
import VueNumeric from 'vue-numeric'

import 'jquery/dist/jquery.min'
import 'popper.js/dist/popper.min'
import 'bootstrap/dist/js/bootstrap.min'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.use(VeeValidate)
Vue.use(VueNumeric)

Vue.filter('currency', function (value) {
    return 'RD $' + parseFloat(value).toFixed(2);
});

const vm = new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
});