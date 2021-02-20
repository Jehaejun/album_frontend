const namespaced = true

// state
const state = {
  nickName: ''
  , userCode: ''
  , profileImage: ''
}

// mutations
const mutations = {
     setUserData (state, data) {
      state.nickName = data.nickName
      state.userCode = data.userCode
      state.profileImage = data.profileImage
    }
}

// actions
const actions = {
    callMutation ({ commit }, { newMsg }) {
      commit('setUserData', newMsg)
    }
}

// getters
const getters = {

    getUserData(state) {
      return state
    },
    getUserCode(state) {
      return state.userCode
    },
    getNickName(state) {
      return state.nickName
    },
    getprofileImage(state) {
      return state.profileImage
    }
}

export default {
  namespaced,
  state,
  mutations,
  actions,
  getters
}