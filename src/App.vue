<template>
  <div id="app">
    <nav class="uk-navbar uk-navbar-attached uk-margin-bottom">
      <div class="uk-container uk-container-center">
        <a href="/" class="uk-navbar-brand">Awesome</a>
        <ul class="uk-navbar-nav">
          <li><router-link to="/"><i class="uk-icon-home"></i> 日志</router-link></li>
          <li><a target="_blank" href="http://www.liaoxuefeng.com/wiki/0014316089557264a6b348958f449949df42a6d3a2e542c000"><i class="uk-icon-book"></i> 教程</a></li>
          <li><a target="_blank" href="https://github.com/michaelliao/awesome-python3-webapp"><i class="uk-icon-code"></i> 源码</a></li>
        </ul>
        <div class="uk-navbar-flip">
          <ul class="uk-navbar-nav">
            <li class="uk-parent dropdown" data-uk-dropdown v-if="user">
              <a href="#0"><i class="uk-icon-envelope-o"></i> 消息</a>
              <div class="uk-dropdown">
                <ul class="uk-nav">
                  <li><a href="/manage/comments"><i class="uk-icon"></i> 评论</a></li>
                </ul>
              </div>
            </li>
            <li class="uk-parent dropdown" data-uk-dropdown v-if="user">
              <a @click="toUser"><i class="uk-icon-user"></i> {{ user.name }}</a>
              <div class="uk-dropdown uk-dropdown-navba">
                <ul class="uk-nav">
                  <li><a @click="logout"><i class="uk-icon-sign-out"></i> 登出</a></li>
                  <li><router-link to="/manager/blog"><i class="uk-icon-edit"></i> 管理博客</router-link></li>
                </ul>
              </div>
            </li>
            <li><router-link to="/manager/login" v-if="!user"><i class="uk-icon-sign-in"></i> 登陆</router-link></li>
            <li><router-link to="/manager/register" v-if="!user"><i class="uk-icon-edit"></i> 注册</router-link></li>

          </ul>
        </div>
      </div>
    </nav>

    <div class="container">
      <div class="uk-container uk-container-center">
        <router-view>

        </router-view>
      </div>
    </div>

    <div class="uk-margin-large-top bottom-nav" style="background-color:#eee; border-top:1px solid #ccc;">
      <div class="uk-container uk-container-center uk-text-center">
        <div class="uk-panel uk-margin-top uk-margin-bottom">
          <p>
            <a target="_blank" href="http://weibo.com/liaoxuefeng" class="uk-icon-button uk-icon-weibo"></a>
            <a target="_blank" href="https://github.com/michaelliao" class="uk-icon-button uk-icon-github"></a>
            <a target="_blank" href="http://www.linkedin.com/in/liaoxuefeng" class="uk-icon-button uk-icon-linkedin-square"></a>
            <a target="_blank" href="https://twitter.com/liaoxuefeng" class="uk-icon-button uk-icon-twitter"></a>
          </p>
          <p>Powered by <a href="http://awesome.liaoxuefeng.com">Awesome Python Webapp</a>. Copyright &copy; 2014. [<a href="/manage/" target="_blank">Manage</a>]</p>
          <p><a href="http://www.liaoxuefeng.com/" target="_blank">www.liaoxuefeng.com</a>. All rights reserved.</p>
          <a target="_blank" href="http://www.w3.org/TR/html5/"><i class="uk-icon-html5" style="font-size:64px; color: #444;"></i></a>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    name: 'App',
    data(){
      return {

      }
    },
    mounted() {
      this.$axios.get('/api/user').then(res=>{
        this.setUser(res.data)
      })
    },
    methods: {
      ...mapMutations(['setUser']),
      toUser(e){
        e.preventDefault()
        this.$router.push("/manager/users")
      },
      logout(e){
        e.preventDefault()
        this.$axios.post('/signout').then(res=>{
          this.setUser(null)
          this.$router.push('/')
        })
      }

    },
    computed: {
      ...mapState(['user'])
    }
  }
</script>

<style>
  html, body, #app {
    height: 100%;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    /*padding-bottom: 215px;*/
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .container {
    /*height: 100%;*/
    overflow-y: auto;
    padding-bottom: 36px;
    flex-grow: 1;
  }
  .bottom-nav.uk-margin-large-top {
    /*position: fixed;*/
    /*width: 100%;*/
    /*bottom: 0;*/
    margin: 0 !important;
  }
  .dropdown:hover .uk-dropdown {
    display: block;
  }
</style>
