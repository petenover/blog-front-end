<template>
  <div class="uk-grid">
    <div class="uk-width-1-1 uk-margin-bottom">
      <div class="uk-panel uk-panel-box">
        <ul class="uk-breadcrumb">
          <li><a >评论</a></li>
          <li><a>日志</a></li>
          <li class="uk-active"><span>用户</span></li>
        </ul>
      </div>
    </div>

    <div id="error" class="uk-width-1-1" v-if="isLoading=='error'">
    </div>

    <div id="loading" class="uk-width-1-1 uk-text-center" v-if="isLoading=='loading'">
      <span><i class="uk-icon-spinner uk-icon-medium uk-icon-spin"></i> 正在加载...</span>
    </div>

    <div class="uk-width-1-1" v-if="!isLoading">
      <table class="uk-table uk-table-hover">
        <thead>
        <tr>
          <th class="uk-width-4-10">名字</th>
          <th class="uk-width-4-10">电子邮件</th>
          <th class="uk-width-2-10">注册时间</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>
            <span v-text="user.name"></span>
            <span v-if="user.admin" style="color:#d05"><i class="uk-icon-key"></i> 管理员</span>
          </td>
          <td>
            <a :href="'mailto:'+user.email" v-text="user.email"></a>
          </td>
          <td>
            <span>{{user.created_at|datetime('yyyy年MM月dd日 hh时mm分ss秒')}}</span>
          </td>
        </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'users',
    data(){
      return {
        users: [],
        isLoading: 'loading'
      }
    },
    beforeCreate() {
      this.$axios.get("/api/users").then(res=>{
        console.log(res)
        this.users = res.data.users
        this.isLoading = ''
      }).catch(e=>{
        this.isLoading = 'error'
      })
    }
  }
</script>

<style scoped>

</style>
