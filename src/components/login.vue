<template>
      <div class="uk-vertical-align uk-text-center uk-height-1-1">
        <div class="uk-vertical-align-middle" style="width: 320px">
          <p><router-link to="/" class="uk-icon-button"><i class="uk-icon-html5"></i></router-link> <a href="/">Awesome Python Webapp</a></p>
          <form  @submit="submit" class="uk-panel uk-panel-box uk-form">
            <div class="uk-alert uk-alert-danger uk-hidden"></div>
            <div class="uk-form-row">
              <div class="uk-form-icon uk-width-1-1">
                <i class="uk-icon-envelope-o"></i>
                <input v-model="email" name="email" type="text" placeholder="电子邮件" maxlength="50" class="uk-width-1-1 uk-form-large">
              </div>
            </div>
            <div class="uk-form-row">
              <div class="uk-form-icon uk-width-1-1">
                <i class="uk-icon-lock"></i>
                <input v-model="passwd" name="passwd" type="password" placeholder="密码" maxlength="50" class="uk-width-1-1 uk-form-large">
              </div>
            </div>
            <div class="uk-form-row">
              <button type="submit" class="uk-width-1-1 uk-button uk-button-primary uk-button-large"><i class="uk-icon-sign-in"></i> 登录</button>
            </div>
          </form>
        </div>
      </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  export default {
    name: 'login',
    data(){
      return {
        email: '',
        passwd: ''
      }
    },
    methods: {
      ...mapMutations(['setUser']),
      submit: function (event) {
        event.preventDefault();
         var email = this.email.trim().toLowerCase(),
          data = {
            email: email,
            passwd: this.passwd==='' ? '' : CryptoJS.SHA1(email + ':' + this.passwd).toString()
          };
         this.$axios.post("/api/authenticate",data).then(res=>{
           console.log(res)
           this.setUser(res.data);
           this.$router.push("/")
         })
      }
    }
  }
</script>

<style scoped>

</style>
