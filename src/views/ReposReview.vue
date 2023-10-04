
<script>
import moment from 'moment'
import reposService from "../service/reposService.js"
export default {
  data() {
    return {
      ownerLogin: null,
      avatar_url: null,
      ownerName: null,
      ownerBlog: null,
      ownerGit: null,
      repoName: null,
      starsCount: null,
      lastUpdate: null,
      languages: null,
      desc: null,
      formattedDateTime: '',
      repos: null,
      repoUrl: null,
    }
  },

  async created() {

    this.ownerLogin = this.$route.params.ownerLogin
    var userInfo = await reposService.getUser(this.ownerLogin) //инфа по пользователю
    var repoInfo = await reposService.getRepoInfoById(this.$route.params.id) //инфа по репозиторию
    this.languages = (await reposService.getLanguages(this.$route.params.id)).data //языки проекта
    this.repos = (await reposService.getReposUser(this.ownerLogin)).data

    const total = Object.values(this.languages).reduce((acc, val) => acc + val, 0)

    for (let key in this.languages) {

      this.languages[key] = ((this.languages[key] / total) * 100);
      this.languages[key] = (this.languages[key]).toFixed(1);
    }

    this.ownerBlog = userInfo.data.blog
    this.ownerGit = userInfo.data.html_url
    this.ownerName = userInfo.data.name
    this.repoUrl = repoInfo.data.svn_url
    this.avatar_url = userInfo.data.avatar_url
    this.repoName = repoInfo.data.name
    this.starsCount = repoInfo.data.stargazers_count
    this.lastUpdate = repoInfo.data.updated_at
    this.desc = repoInfo.data.description
    const dateTime = moment(this.lastUpdate);
    this.formattedDateTime = dateTime.format('DD.MM.YYYY г. hh:mm ч. ');
    console.log(userInfo)
  }
}
</script>
<template>
  <div class="container-review">

    <div class="review-head">
      <img :src="this.avatar_url" class="avatar" />
      <div>
        <h3 ><span>{{ this.ownerLogin }}</span></h3>
        <div><span>{{ this.ownerName }}</span></div>
        <div><span><a :href="this.ownerBlog">{{ this.ownerBlog }}</a></span></div>
        <div><span><a :href="this.ownerGit">{{ this.ownerGit }}</a></span></div>
      </div>
    </div>

    <div class="review-main">
      <h3><span>Название репозитория: {{ this.repoName }}</span></h3>
      <div><span>GitHub: <a target="blank" :href="this.repoUrl">{{ this.repoUrl }} </a> </span></div>
      <div> <span>звезд: {{ this.starsCount }}</span></div>
      <div> <span>обновлено: {{ this.formattedDateTime }}</span></div>
      <span>Языки импользуемые в проекте: </span>
      <ul>
        <div v-for="(value, key) in languages" :key="key"><span>{{ key }}: {{ value }} %</span></div>
      </ul>
      <div>
        <span>описание проекта: {{ this.desc }}</span>
      </div>
    </div>
    <div class="review-footer">
      <router-link v-for="repo in repos" :key="repo.name" :to="'/repo/' + this.ownerLogin + '/' + repo.id"
        target="_blank">
        <div>
          <span>{{ repo.name }}</span>
        </div>
      </router-link>
    </div>
  </div>
</template>