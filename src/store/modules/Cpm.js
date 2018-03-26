export const ADD_ACTIVITY = 'ADD_ACTIVITY';
export const FIRST_TIME_ACTIVITY = 'FIRST_TIME_ACTIVITY';
export const LAST_TIME_ACTIVITY = 'LAST_TIME_ACTIVITY';


const state = {
    activities: [],
    expenses: 0,
};

const getters = {

    showActivities: (state) => {
        return state.activities;
    },
    totalQuantity: (state) => {
        return state.activities.reduce((total, item) => total + (item.costo * item.duracion), 0);
    },
    totalDuration: (state) => {
        let duracion = state.activities.slice(-1);
        console.log(duracion);
        if (duracion.length === 0){ return 0; }
        if(duracion[0].hasOwnProperty('late_finish')){ return duracion[0].late_finish; }
        return 0;
    },
    totalCost: (state, getters) => {
        return getters.totalQuantity + (state.expenses * getters.totalDuration);
    },

};



const mutations = {
    [ADD_ACTIVITY]: (state, payload) => {
        state.activities.push(payload);
    },
    [FIRST_TIME_ACTIVITY] : (state, payload) => {
        state.activities.find(obj => obj.actividad === payload.actividad).early_start = payload.early_start;
        state.activities.find(obj => obj.actividad === payload.actividad).early_finish = payload.early_finish;
    },
    [LAST_TIME_ACTIVITY] : (state, payload) => {
        state.activities.find(obj => obj.actividad === payload.actividad).late_finish = payload.late_finish;
        state.activities.find(obj => obj.actividad === payload.actividad).late_start = payload.late_start;
    }
};

const actions = {

};

export default  {
    state,
    getters,
    mutations,
    actions,
};