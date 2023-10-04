

<script>
export default {
  props: {
    itemsPerPage: {
      type: Number,
      required: true
    },
    totalItems: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    updatePage: {
      type: Function,
      required: true
    }
  },
  computed: {
    pageCount() {
      return Math.ceil(this.totalItems / this.itemsPerPage);

    }
  }
};
</script>
<template>
  <div class="pag-container">
    
      <div class="pag-item" v-for="page in pageCount" :key="page">
        <div class="btn" :class="{ active: currentPage === page }" @click="updatePage(page)">{{ page }}</div>
      </div>
    
  </div>
</template>