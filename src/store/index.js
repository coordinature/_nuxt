export const state = () => ({
  z: 'sdfjkhskldjfhjskjdhfksjdhf',
  index: {}
});

export const mutations = {
  update_list(state, uploadDbFirmenistorieData) {
    state.z = uploadDbFirmenistorieData;
  },
  update_index(state, index) {
    state.index[index.path] = index.hash
  }
};

export const actions = {
  index({ commit }, index ) {
    // console.log('index', index)
    commit('update_index', index);
  },
  async nuxtServerInit({ commit }, context) {
    
    console.log(context);
    commit('update_list', 123);
  },
  async nuxtClientInit({ commit }, context) {

    console.log(this, context);
    commit('update_list', 123);
  }
};