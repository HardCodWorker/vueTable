import { createStore } from 'vuex';

const store = createStore({
  state() {
    return { 
      initialAccounts: [],
      accounts: [],
      sortOrder: '',
      query: '',
      itemPerPage: 10,
      page:1,
    }
  },

  mutations: {
    set(state, payload) {
      state.accounts = [...payload]
    },

    setInitialAccounts(state, payload) {
      state.initialAccounts = [...payload]
    },

    setSort(state, payload) {
      state.sortOrder = payload;
    },

    setFirstPage(state){
      state.page=1
    },

    sort(state) {
      state.accounts.sort((a, b) => {
        switch (state.sortOrder) {
          case 'asc':
            return +a.accountId - +b.accountId
          case 'desc':
            return +b.accountId - a.accountId
          default:
            return;
        }
      })

      if (state.sortOrder === '') {
        state.accounts = state.accounts.reverse() 
      }
    },

    filter(state) {
      state.accounts = state.initialAccounts.filter(account => 
        account.email.toLowerCase().includes(state.query.toLowerCase().trim())
      )
    },
    
    clearQuery(state){
      state.query=''
       state.accounts = state.initialAccounts.filter(account => 
        account.email.toLowerCase().includes(state.query.toLowerCase().trim())
      )
    },
  },

  getters: {
    accounts(state) {
      return state.accounts
    },

    sortOrder(state) {
      return state.sortOrder
    }
  }
})

export default store;