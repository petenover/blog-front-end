<template>
  <div class="uk-grid">
    <div class="uk-width-1-1 uk-margin-bottom">
      <div class="uk-panel uk-panel-box">
        <ul class="uk-breadcrumb">
          <li><a href="/manage/comments">评论</a></li>
          <li class="uk-active"><span>日志</span></li>
          <li><a href="/manage/users">用户</a></li>
        </ul>
      </div>
    </div>
    <!--
       <div id="error" class="uk-width-1-1">
       </div>

       <div id="loading" class="uk-width-1-1 uk-text-center">
         <span><i class="uk-icon-spinner uk-icon-medium uk-icon-spin"></i> 正在加载...</span>
       </div>-->

       <div class="uk-width-1-1">
         <router-link :to="'/manager/blog/edit/'" class="uk-button uk-button-primary"><i class="uk-icon-plus"></i> 新日志</router-link>

         <table class="uk-table uk-table-hover">
           <thead>
           <tr>
             <th class="uk-width-5-10">标题 / 摘要</th>
             <th class="uk-width-2-10">作者</th>
             <th class="uk-width-2-10">创建时间</th>
             <th class="uk-width-1-10">操作</th>
           </tr>
           </thead>
           <tbody>
           <tr v-for="blog in blogs" >
             <td>
               <router-link :to="'/manager/blog/detail/'+blog.id" v-text="blog.name"></router-link>
             </td>
             <td>
               <router-link :to="'/user/'+blog.user_id" v-text="blog.user_name"></router-link>
             </td>
             <td>
               <span>{{blog.created_at|datetime('yyyy年MM月dd日 hh时mm分ss秒')}}</span>
             </td>
             <td>
               <router-link :to="'/manager/blog/edit/' + blog.id"><i class="uk-icon-edit"></i></router-link>
               <a href="#0" @click="delete_blog(blog)"><i class="uk-icon-trash-o"></i></a>
             </td>
           </tr>
           </tbody>
         </table>

         <!--<div v-component="pagination" v-with="page"></div> -->
    </div>
  </div>
</template>

<script>
  export default {
    name: 'blog_manage',
    data() {
      return {
        blogs: []
      }
    },
    methods: {
    },
    beforeCreate() {
      this.$axios.get("/api/blogs").then(res=>{
        this.blogs = res.data.blogs
      })
    }
  }
</script>

<style scoped>

</style>
