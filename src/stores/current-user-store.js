import { defineStore } from 'pinia'

export const useCurrentUserStore = defineStore('currentUser', {
  state: () => ({
    user: null,
    id: null
  }),
  getters: {
    getCurrentUser: (state) => state.user
  },
  actions: {
    setCurrentUser (object) {
      this.user = object
      this.id = object.id
    },
    clearCurrentUser () {
      this.user = null
      this.id = null
    }
  }
})
