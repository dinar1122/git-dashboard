<script>
export default {
  data() {
    return {
      searchQuery: ''
    }
  },
  watch: {
    searchQuery(newValue) {
      this.$emit('update:searchQuery', newValue)
    }
  }
}
</script>

<template>
  <div class="search">
    <input  class="search-line" v-model="searchQuery" type="text">
  </div>
</template>
<style>
@import "./../assets/base.css";
</style>