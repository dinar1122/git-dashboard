<script>
import { defineProps } from 'vue';
import reposService from "../service/reposService.js"
import RepositoryItem from './RepositoryItem.vue';


export default {
  components: {
    RepositoryItem
  },
  props: {
    card: defineProps({
      id: Number,
      login: String,
      urlRepos: String,
      avatar: String,
    })
  },
  data() {
    return {
      response: [],
      login: this.card.login,
      showAll: false,
      visibleRepos: [],
    }
  },
  methods: {
    toggleShowAll() {
      this.showAll = !this.showAll;
      if (this.showAll) {
        this.visibleRepos = this.response.data;
      } else {
        this.visibleRepos = this.response.data.slice(0, 5);
      }
    }
  },
  async created() {
    this.response = await reposService.getReposUser(this.card.login);
    this.response.data.sort((a, b) => b.stargazers_count - a.stargazers_count)
    this.visibleRepos = this.response.data.slice(0, 5);
  }
};
</script>

<template>
  <div>

    <div class="container-card">
      <div>
        <img :src="card.avatar_url" class="avatar" />
      </div>
      <div class="card-info">
        <div>
          <div class="container-card2">

            <div class="container-card2">
              <h2 class="">{{ card.login }}</h2>
              <a :href="card.html_url" class="element" target="_blank"></a>
            </div>
            <div>
              <div class="btn1" @click="toggleShowAll">
                {{ showAll ? 'Скрыть' : 'Показать больше' }}
              </div>
            </div>
          </div>

        </div>
        <RepositoryItem v-for="repo in visibleRepos" :key="repo.id" :stargazers_count="repo.stargazers_count"
          :name="repo.name" :updated_at="repo.updated_at" :html_url="repo.html_url" :id="repo.id"
          :ownerLogin="repo.owner.login">
        </RepositoryItem>
      </div>
    </div>

  </div>
</template>
<style>
@import "./../assets/base.css";
</style>
