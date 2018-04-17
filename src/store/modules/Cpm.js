export const ADD_ACTIVITY = 'ADD_ACTIVITY';
export const CLEAR_ACTIVITY = 'CLEAR_ACTIVITY';
export const EDIT_ACTIVITY = 'EDIT_ACTIVITY';
export const DELETE_ACTIVITY = 'DELETE_ACTIVITY';
export const FIRST_TIME_ACTIVITY = 'FIRST_TIME_ACTIVITY';
export const LAST_TIME_ACTIVITY = 'LAST_TIME_ACTIVITY';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const SELECTED_DURATION = 'SELECTED_DURATION';
export const SELECTED_CONVERSION = 'SELECTED_CONVERSION';
export const TASA = 'TASA';
export const STATUS = 'STATUS';

const state = {
  activities: [],
  expenses: 0,
  duration: 'Meses',
  tasa: 49.53,
  conversion: 'DOP - Peso dominicano',
  activity_id: null,
  status: false,
};

const getters = {
  getExpenses: (state) => {
    return state.expenses;
    },

  findActivity: (state) => {
    return function (id) {
      return state.activities.find(activity => activity.id === id);
    }
    },

  showActivities: (state) => {
    return state.activities;
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

  totalCostConvert: (state, getters) => {
    if(state.conversion === "DOP - Peso dominicano") {
      return getters.totalCost * state.tasa;
    }
    return getters.totalCost / state.tasa;
    },

  optionDuration: (state) => {
    let duracion = state.duration;
    if(duracion === null) { duracion = 'Meses' }
    return "Dur./" + duracion;
    },

  isNotEmptyActivities: (state) => {
    return Boolean(state.activities.length > 0);
    },

  editActivity: (state, getters) => {
    if(state.activity_id === null) {
      return {};
    }
    return getters.findActivity(state.activity_id);
    },

  status: (state) => {
    return state.status;
    },

  showConversion: (state) => {
    return state.conversion;
  }

};

const mutations = {
  [CLEAR_ACTIVITY]: (state, payload) => {
    state.activities.forEach(actividad => {
      actividad.early_start = null;
      actividad.early_finish = null;
      actividad.late_finish = null;
      actividad.late_start = null;
    });
  },
  [ADD_ACTIVITY]: (state, payload) => {
      state.activities.push(payload);
  },
  [EDIT_ACTIVITY]: (state, payload) => {
      state.activity_id = payload.id;
  },
  [DELETE_ACTIVITY]: (state, { id }) => {
      let index = state.activities.findIndex(activity => activity.id === id);
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
  },
  [SELECTED_CONVERSION] : (state, { conversion }) => {
      state.conversion = conversion;
  },
  [STATUS] : (state) => {
      state.status = true;
  },
  [TASA] : (state, payload) => {
      state.tasa = payload.tasa;
  }
};

const actions = {
  clearActivity({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit(CLEAR_ACTIVITY);
      return resolve();
    });
  },
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
  deleteActivity({ commit }, id) {
      commit(DELETE_ACTIVITY,id);
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
  },
  selectConversion({ commit }, payload) {
      commit(SELECTED_CONVERSION, payload);
  },
  editActivityId({ commit, getters }, payload) {
      commit(EDIT_ACTIVITY, payload);
  },
  status({ commit }){
      commit(STATUS);
  },
  tasa({ commit }, payload){
      commit(TASA, payload);
  },
};

export default  {
    state,
    getters,
    mutations,
    actions,
};
