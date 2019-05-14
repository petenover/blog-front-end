<template>
  <div class="uk-width-2-3">
    <h1>欢迎注册！</h1>
    <form @submit="submit" class="uk-form uk-form-stacked">
      <div class="uk-alert uk-alert-danger uk-hidden"></div>
      <div class="uk-form-row">
        <label class="uk-form-label">名字:</label>
        <div class="uk-form-controls">
          <input v-model="name" type="text" maxlength="50" placeholder="名字" class="uk-width-1-1">
        </div>
      </div>
      <div class="uk-form-row">
        <label class="uk-form-label">电子邮件:</label>
        <div class="uk-form-controls">
          <input v-model="email" type="text" maxlength="50" placeholder="your-name@example.com" :class="['uk-width-1-1', errors.has('email') && 'danger-border']" name="email" v-validate="'email'">
          <span v-show="errors.has('email')" class="help is-danger">邮箱格式错误</span>
        </div>
      </div>
      <div class="uk-form-row">
        <label class="uk-form-label">输入密码:</label>
        <div class="uk-form-controls">
          <input v-model="password1" type="password" maxlength="50" placeholder="输入密码" :class="['uk-width-1-1', errors.has('password1') && 'danger-border']" v-validate="{regex: /^.*(?=.{8,})(?=.*\d)(?=.*[A-Za-z]).*$/}" name="password1">
          <span v-show="errors.has('password1')" class="help is-danger">密码必须8位数字字母组合</span>
        </div>
      </div>
      <div class="uk-form-row">
        <label class="uk-form-label">重复密码:</label>
        <div class="uk-form-controls">
          <input v-model="password2" type="password" maxlength="50" placeholder="重复密码" :class="['uk-width-1-1', errors.has('password2') && 'danger-border']"  v-validate="{is: password1}" name="password2">
          <span v-show="errors.has('password2')" class="help is-danger">输入两次密码不一致</span>
        </div>
      </div>
      <div class="uk-form-row">
        <button type="submit" class="uk-button uk-button-primary" :disabled="disabledFlag"><i class="uk-icon-user"></i> 注册</button>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'register',
    data(){
      return {
        name: '',
        email: '',
        password1: '',
        password2: ''
      }
    },
    methods: {
      submit: function (event) {
        event.preventDefault();
        var email = this.email.trim().toLowerCase(),
        data = {
          name: this.name.trim(),
          email: email,
          passwd: CryptoJS.SHA1(email + ':' + this.password1).toString()
        };
        this.$axios.post('/api/users',data).then(res=>{
          this.$router.push("/")
        });
      }
    },
    computed: {
      disabledFlag(){
        //验证不通过失效按钮
        return this.$validator.errors.any()
      }
    }
  }
</script>

<style scoped>
 .is-danger {
   color: red;
 }
 .danger-border {
    border-color: red !important;
 }
</style>
