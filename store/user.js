export const state = () => ({
    user: []
  });
  
  export const mutations = {
    setSymptoms(state, user) {
      state.user = user;
    }
  };
  
  export const getters = {
    getSymptoms(state) {
      return state.user;
    }
  };
  