<template>
  <div class="uk-grid">
    <div class="uk-width-1-1 uk-text-center success-container">
      <h2>{{ title }}</h2>
      <div><router-link :to="'/manager/blog/edit/'"><span><i class="uk-icon-medium uk-icon-spin"></i> 再写一篇...</span></router-link></div>
      <div><router-link :to="'/manager/blog/detail/'+ id"><span><i class="uk-icon-medium uk-icon-spin"></i> 发布成功并查看文章...</span></router-link></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'blog_success',
    data(){
      const {id, title} = this.$route.query
      return{
        id,
        title
      }
    }
  }
</script>

<style scoped>
  .success-container {
    margin: 120px 0;
  }
  .success-container div {
    height: 36px;
    line-height: 36px;
  }
</style>
