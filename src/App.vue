
<script>
import { getAccounts } from './api/accounts';

export default {

  mounted() {
    getAccounts().then(({ data }) => {
      this.setItems(data);
      this.setInitialItems(data);
    })
  },

  computed: {
    getSortorder() {
      return this.$store.getters.sortOrder
    },

    getDisplayAccounts() {
      const start = (this.$store.state.page - 1) * this.$store.state.itemPerPage
      const end = start + this.$store.state.itemPerPage

      return this.$store.getters.accounts.slice(start, end)
    },

    countPages() {
      return (Math.ceil(this.$store.getters.accounts.length / this.$store.state.itemPerPage))

    }
  },

  methods: {
    setItems(payload) {
      this.$store.commit('set', payload)
    },

    setInitialItems(payload) {
      this.$store.commit('setInitialAccounts', payload)
    },

    handleSort() {
      if (this.getSortorder === '') {
        this.$store.commit('setSort', 'asc')
      } else if (this.getSortorder === 'asc') {
        this.$store.commit('setSort', 'desc')
      } else {
        this.$store.commit('setSort', '')
      }
      this.$store.commit('sort')
    },

    filter() {
      this.$store.commit('filter')
    },

    clearQuery() {
      this.$store.commit('clearQuery')
    },
    
    setFirstPage() {
      this.$store.commit('setFirstPage')
    }
  }
}
</script>


<template>
  <div 
    class="div" 
    style="display: flex; gap: 10px;"
  >
    <v-btn 
      style="align-self: center; margin-left: 5px;" 
      @click="clearQuery" 
      icon="mdi-close-outline"  
      density="compact"> 
    </v-btn>
    
    <v-text-field 
      label="Filter by email" 
      variant="underlined" 
      v-model="$store.state.query" 
      @input="filter"
      @click="setFirstPage">
    </v-text-field>
  </div>
  
  <v-table>
    <thead>
      <tr>
        <th class="text-left">
          ID
          <v-btn label="Sort" 
            size="x-small" 
            @click="handleSort"
          >
            <v-icon v-if="getSortorder === ''">mdi-sort</v-icon>
            <v-icon v-else-if="getSortorder === 'asc'">mdi-sort-ascending</v-icon>
            <v-icon v-else="getSortorder==='mdi-sort-descending'">mdi-sort-descending</v-icon>
          </v-btn>
        </th>
        
        <th class="text-left">
          Email
        </th>
      </tr>
    </thead>
    
    <tbody>
      <tr v-for="item in getDisplayAccounts" :key="item.accountId">
        <td>{{ item.accountId }}</td>
        <td>{{ item.email }}</td>
      </tr>
    </tbody>
  </v-table>
  <div class="text-center">
    <v-pagination 
      v-model="$store.state.page" 
      :length="countPages" 
      rounded="circle">
    </v-pagination>
  </div>
</template>

