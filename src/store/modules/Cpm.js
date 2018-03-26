export const ADD_ACTIVITY = 'ADD_ACTIVITY';
export const UPDATE_ACTIVITY = 'UPDATE_ACTIVITY';
export const DELETE_ACTIVITY = 'DELETE_ACTIVITY';
export const FIRST_TIME_ACTIVITY = 'FIRST_TIME_ACTIVITY';
export const LAST_TIME_ACTIVITY = 'LAST_TIME_ACTIVITY';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const SELECTED_DURATION = 'SELECTED_DURATION';

const state = {
    activities: [],
    expenses: 0,
    duration: 'Meses'
};

const getters = {

    findActivity: (state) => {
        return function (id) {
            return state.activities.find(activity => activity.id === id);
        }
    },
    showActivities: (state) => {
        return state.activities;
    },
    showDuration: (state) => {
        return "Duración/" + state.duration;
    },
    selectOptions: (state, getters) => {
        let options = [];

        getters.showActivities.forEach(function(element) {
            options.push(element.id);
        });
        return options;
    },
    totalQuantity: (state) => {
        return state.activities.reduce((total, item) => total + (item.costo * item.duracion), 0);
    },
    totalDuration: (state) => {
        let duracion = state.activities.slice(-1);
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
    [UPDATE_ACTIVITY]: (state, { id, draft }) => {
        let index = state.activities.findIndex(activity => activity.id = id);
        state.activities.splice(index, 1, draft);
    },
    [DELETE_ACTIVITY]: (state, { id }) => {
        let index = state.activities.findIndex(activity => activity.id = id);
        state.activities.splice(index, 1);
    },
    [FIRST_TIME_ACTIVITY] : (state, payload) => {
        state.activities.find(obj => obj.id === payload.id).early_start = payload.early_start;
        state.activities.find(obj => obj.id === payload.id).early_finish = payload.early_finish;
    },
    [LAST_TIME_ACTIVITY] : (state, payload) => {
        state.activities.find(obj => obj.id === payload.id).late_finish = payload.late_finish;
        state.activities.find(obj => obj.id === payload.id).late_start = payload.late_start;
    },
    [ADD_EXPENSES] : (state, { expenses }) => {
        state.expenses = expenses;
    },
    [SELECTED_DURATION] : (state, { duracion }) => {
        state.duration = duracion;
    }
};

const actions = {
    createActivity({ commit, getters }, payload) {
        return new Promise((resolve, reject) => {
            let activity = {
                id: payload.actividad.toUpperCase(),
                prerrequisito: payload.prerrequisito,
                costo: payload.costo,
                duracion: payload.duracion,
                early_start: null,
                early_finish: null,
                late_finish: null,
                late_start: null,
            };
            if(getters.findActivity(activity.id) !== undefined && getters.findActivity(activity.id).id === activity.id) {
                return reject("Actividad repetida, Por favor escribe otro nombre para la actividad...");
            }
            commit(ADD_ACTIVITY,activity);
            return resolve(activity);
        });
    },
    updateActivity(context, payload) {
        context.commit(UPDATE_ACTIVITY,payload);
    },
    deleteActivity(context, id) {
        context.commit(DELETE_ACTIVITY,id);
    },
    getFirstTime({ commit }, payload) {
        return new Promise((resolve) => {
            commit(FIRST_TIME_ACTIVITY, payload);
            return resolve();
        });
    },
    getLastTime({ commit }, payload) {
        return new Promise((resolve) => {
            commit(LAST_TIME_ACTIVITY, payload);
            return resolve();
        });
    },
    addAdministrativeExpenses({ commit }, payload) {
        commit(ADD_EXPENSES, payload);
    },
    selectDuration({ commit }, payload) {
        commit(SELECTED_DURATION, payload);
    }
};

export default  {
    state,
    getters,
    mutations,
    actions,
};