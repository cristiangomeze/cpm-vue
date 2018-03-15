export const ADD_ACTIVITY = 'ADD_ACTIVITY';


const state = {
    activities: [],
    expenses: 0,
};

const getters = {

    showActivities: (state) => {
        return state.activities;
    },

    totalQuantity: (state) => {
        return state.activities.reduce((total, item) => total + (item.costo * item.duracion), 0)
    },

};



const mutations = {
    [ADD_ACTIVITY]: (state, payload) => {
        state.activities.push(payload);
    },
};

const actions = {

    // allProducts ({commit}) {
    //     commit(ALL_PRODUCTS)
    //     // Fetch actual products from the API
    //     axios.get(`${API_BASE}/products`).then(response => {
    //         commit(ALL_PRODUCTS_SUCCESS, response.data.data)
    //     })
    // },
    //
    // allClients ({commit}){
    //     commit(ALL_CLIENTS)
    //
    //     axios.get(`${API_BASE}/users/client`).then(response => {
    //         commit(ALL_CLIENTS_SUCCESS, response.data.data)
    //     })
    // }

};

export default  {
    state,
    getters,
    mutations,
    actions,
};