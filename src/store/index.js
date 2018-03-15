import Vue from 'vue'
import Vuex from 'vuex'
import cpm from './modules/Cpm'

Vue.use(Vuex)

let store =  new Vuex.Store({
    modules: {
        cpm,
    }
});

export default store