<script setup>
import { RouterView } from "vue-router";


</script>

<template>
  <div>
    <main class="content">
      <router-link to="/">
        <div id="myDiv">home</div>
      </router-link>
      <div class="container">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {
  }
}
</script>

<style></style>
