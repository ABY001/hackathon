export const state = () => ({
  symptoms_type: []
});

export const mutations = {
  setSymptoms(state, symptoms_type) {
    state.symptoms_type = symptoms_type;
  }
};

export const getters = {
  getSymptoms(state) {
    return state.symptoms_type;
  }
};
