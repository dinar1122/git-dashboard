<script>
import reposService from "../service/reposService.js"
import Card from "../components/CardComponent.vue"
import PaginatorComp from '../components/PaginatorComp.vue';
import SearchComp from '../components/SearchComp.vue'

export default {
  components: {
    Card,
    PaginatorComp,
    SearchComp
  },
  data() {
    return {
      searchQuery: null,
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: [],
      response: [],
      logins: [],
      responseDouble: [],
      displayedItems: []
    }
  },

  methods: {
    updatePage(page) {
      this.currentPage = page;
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.displayedItems = this.response.slice(startIndex, endIndex)
    },
    async handleSearchQueryUpdate(newValue) {
      this.searchQuery = newValue
      if (this.searchQuery) {
        try {
        const response = await reposService.getUser(this.searchQuery)
        this.response = [response.data]
        this.totalItems = this.response.length
        this.updatePage(1)
      } catch (error) {
        console.error(error)
        this.response = []
        this.totalItems = 0
      }
    } else {
      const response = await reposService.getUsers()
      this.response = response.data.map(user => user)
      this.totalItems = this.response.length
      this.updatePage(1)
    }
    }
  },
  async created() {
    var response = await reposService.getUsers()
    this.logins = response.data.map(user => user.login)
    this.response = response.data.map(user => user)
    response = this.response
    this.totalItems = this.response.length;

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedItems = this.response.slice(startIndex, endIndex)

    


    /* const dataRepos = []
    const promises = this.logins.map(login => reposService.getReposUser(login))

     const reposArray = await Promise.all(promises)
     reposArray.forEach((repos, i) => {
       const key = `array${i}`
       dataRepos[key] = repos
     })
     console.log(dataRepos) */



  },
}
</script>
<template>
  <div>
    <SearchComp v-on:update:searchQuery="handleSearchQueryUpdate" />
    <PaginatorComp :itemsPerPage="itemsPerPage" :total-items="totalItems" :current-page="currentPage"
      :update-page="updatePage" :key="currentPage" />
    <Card  v-for="card in displayedItems" :key="card.login" :card="card"  />

  </div>
</template>