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

};

export default  {
    state,
    getters,
    mutations,
    actions,
};