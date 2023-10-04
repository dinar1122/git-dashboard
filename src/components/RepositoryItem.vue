
<script>
import moment from 'moment';
export default {
  props: {
    ownerLogin: String,
    id: Number,
    html_url: String,
    stargazers_count: Number,
    name: String,
    updated_at: String,
  },
  data() {
    return {
      formattedDateTime: '',
    };
  },
  mounted() {
    const dateTime = moment(this.updated_at);
    this.formattedDateTime = dateTime.format('DD.MM.YYYY');
  },
}
</script>

<template>
  <router-link :to="'repo/' + ownerLogin + '/' + id" target="_blank">
    <div class="container-repo" >

      <div class="container-repo1">
        <div class="repo-text">{{ name }}</div>
        <div class="star-icon repo-text"></div>
        <div class="repo-text">{{ stargazers_count }}</div>
      </div>
      <div class="repo-text">обновлено {{ formattedDateTime }}</div>
    </div>
  </router-link>
</template>
