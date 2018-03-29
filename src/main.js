import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './route'
import VeeValidate from 'vee-validate'
import VueNumeric from 'vue-numeric'
import spain from 'vee-validate/dist/locale/es';
import VueCurrencyFilter from 'vue-currency-filter'

Vue.use(VeeValidate);
Vue.use(VueNumeric);


Vue.use(VueCurrencyFilter, {
        symbol : '$',
        thousandsSeparator: ',',
        fractionCount: 2,
        fractionSeparator: '.',
        symbolPosition: 'front',
        symbolSpacing: true
});

const vm = new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App),
    created: function () {
        this.$validator.localize('es', {
            messages: spain.messages,
        });
    },
});