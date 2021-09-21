export const state = () => ({
    user: []
  });
  
  export const mutations = {
    SET_USER(state, user) {
      state.user = user;
    }
  };
  
  export const getters = {
    GET_USER(state) {
      return state.user;
    }
  };
  