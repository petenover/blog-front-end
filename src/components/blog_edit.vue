<template>
  <div class="uk-grid">
    <div class="uk-width-1-1 uk-margin-bottom">
      <div class="uk-panel uk-panel-box">
        <ul class="uk-breadcrumb">
          <li><a href="/manage/comments">评论</a></li>
          <li><a href="/manage/blogs">日志</a></li>
          <li><a href="/manage/users">用户</a></li>
        </ul>
      </div>
    </div>

    <div class="uk-width-2-3 uk-width-100">
      <form class="uk-form uk-form-stacked">
        <div class="uk-alert uk-alert-danger uk-hidden"></div>
        <div class="uk-form-row">
          <label class="uk-form-label">标题:</label>
          <div class="uk-form-controls">
            <input v-model="name" name="name" type="text" placeholder="标题" class="uk-width-1-1">
          </div>
        </div>
        <div class="uk-form-row">
          <label class="uk-form-label">摘要:</label>
          <div class="uk-form-controls">
            <textarea v-model="summary" rows="4" name="summary" placeholder="摘要" class="uk-width-1-1" style="resize:none;"></textarea>
          </div>
        </div>
        <div class="uk-form-row">
          <label class="uk-form-label">内容:</label>
          <div class="uk-form-controls">
<!--            <textarea v-model="content" rows="16" name="content" placeholder="内容" class="uk-width-1-1" style="resize:none;"></textarea>-->
            <quill-editor id="codex-editor" v-model="content" :options="editorOption">

            </quill-editor>
          </div>
        </div>
        <div class="uk-form-row">
          <button @click="submit"  type="submit" class="uk-button uk-button-primary"><i class="uk-icon-save"></i> 保存</button>
          <router-link to="/manager/blog" class="uk-button"><i class="uk-icon-times"></i> 取消</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import hljs from 'highlight.js'
  import { quillEditor } from 'vue-quill-editor'
  export default {
    name: 'blog_edit',
    data(){
      return{
        id: '',
        name: '',
        summary: '',
        content: '',
        editorOption: {
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              ['code-block'],
              [{ 'script': 'sub' }, { 'script': 'super' }],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              [{ 'direction': 'rtl' }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'font': [] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['clean'],
              ['link', 'image', 'video']
            ],
            syntax: {
              highlight: text => hljs.highlightAuto(text).value
            }
          }
        }
      }
    },
    beforeCreate(){
      this.id = this.$route.params.id
      if (this.id){
        this.$axios.get(`/api/blogs/${this.id}`).then(res=>{
          this.id = res.data.id
          this.name = res.data.name
          this.summary = res.data.summary
          this.content = res.data.content
        })
      }

    },
    mounted(){
      console.log(this.content)
    },
    components: {
      quillEditor
    },
    methods: {
      async submit(e) {
        e.preventDefault()
        if (!this.id){
          this.$axios.post(`/api/blogs`, {
            name: this.name.trim(),
            summary: this.summary.trim(),
            content: this.content
          }).then(res=>{
            if (res.code == 0){
              this.$router.push(`/manager/blog/success?id=${res.data.id}&title=${res.data.name}`)
            }
          }).catch(err=>{
          })
        }else {
          this.$axios.post(`/api/blogs/${this.id}`, {
            name: this.name.trim(),
            summary: this.summary.trim(),
            content: this.content
          }).then(res=>{
            if (res.code == 0){
              this.$router.push(`/manager/blog/success?id=${res.data.id}&title=${res.data.name}`)
            }

          }).catch(err=>{
          })
        }

      }
    }
  }
</script>

<style>
  .uk-width-100 {
    width: 100% !important;
  }
  #codex-editor {
    border: 1px solid #ccc;
    /*min-height: auto;*/
  }
  .ql-editor{
    height:400px;
  }
  .ce-block__content {
    margin: 0 !important;
    max-width: 100%;
  }
</style>
