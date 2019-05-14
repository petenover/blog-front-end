<template>
    <div class="uk-grid">
      <div class="uk-width-medium-3-4">
        <article class="uk-article">
          <h2>{{ blog.name }}</h2>
          <p class="uk-article-meta">发表于{{ blog.created_at|datetime('yyyy年MM月dd日 hh时mm分ss秒') }}</p>
          <p>{{ blog.content }}</p>
        </article>

        <hr class="uk-article-divider">

        <h3>发表评论</h3>

        <article class="uk-comment" v-if="user">
          <header class="uk-comment-header">
            <img class="uk-comment-avatar uk-border-circle" width="50" height="50" :src="user.image">
            <h4 class="uk-comment-title">{{ user.name }}</h4>
          </header>
          <div class="uk-comment-body">
            <form @submit="submit" class="uk-form">
              <div class="uk-alert uk-alert-danger uk-hidden"></div>
              <div class="uk-form-row">
                <textarea v-model="content" rows="6" placeholder="说点什么吧" style="width:100%;resize:none;"></textarea>
              </div>
              <div class="uk-form-row">
                <button type="submit" class="uk-button uk-button-primary"><i class="uk-icon-comment"></i> 发表评论</button>
              </div>
            </form>
          </div>
        </article>

        <hr class="uk-article-divider">

        <h3 v-if="comments.length > 0">最新评论</h3>

        <ul class="uk-comment-list" v-if="comments.length > 0">
          <li>
            <article class="uk-comment" v-for="comment in comments" :key="comment.id">
              <header class="uk-comment-header">
                <img class="uk-comment-avatar uk-border-circle" width="50" height="50" :src="comment.user_image ">
                <h4 class="uk-comment-title" >{{ comment.user_name }} {{ comment.user_id==blog.user_id && '(作者)'}}</h4>
                <p class="uk-comment-meta">{{ comment.created_at|datetime('yyyy年MM月dd日 hh时mm分ss秒') }}</p>
              </header>
              <div class="uk-comment-body">
                {{ comment.content }}
              </div>
            </article>
          </li>
        </ul>
        <p v-else>还没有人评论...</p>
      </div>

      <div class="uk-width-medium-1-4">
        <div class="uk-panel uk-panel-box">
          <div class="uk-text-center">
            <img class="uk-border-circle" width="120" height="120" :src="blog.user_image">
            <h3>{{ blog.user_name }}</h3>
          </div>
        </div>
        <div class="uk-panel uk-panel-header">
          <h3 class="uk-panel-title">友情链接</h3>
          <ul class="uk-list uk-list-line">
            <li><i class="uk-icon-link"></i> <a href="#">编程</a></li>
            <li><i class="uk-icon-link"></i> <a href="#">思考</a></li>
            <li><i class="uk-icon-link"></i> <a href="#">读书</a></li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    name: 'blog',
    data(){
      return {
        blog:{},
        comments: [],
        content: ''
      }
    },
    mounted(){
      this.getData()
    },
    methods: {
      submit: function (event) {
        event.preventDefault();
        var id = this.blog.id
        this.$axios.post(`/api/blogs/${ id }/comments`,{
          content: this.content.trim()
        }).then(res=>{
          console.log(res)
          if (res.code == 0){
            console.log(id)
            this.content = ''
            this.getData()
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      getData() {
        var id = this.$route.params.id
        if (id){
          this.$axios.get(`/api/blogs/${id}`).then(res=>{
            this.blog = res.data
          })
          this.$axios.get(`/api/comment/${id}`).then(res=>{
            this.comments = res.data
          })
        }
      }
    },
    computed: {
      ...mapState(['user'])
    }
  }
</script>

<style scoped>

</style>
