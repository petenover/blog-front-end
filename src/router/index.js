import Vue from 'vue'
import Router from 'vue-router'
import Blogs from '@/components/blogs'
import Users from '@/components/users'
import Login from '@/components/login'
import Register from '@/components/register'
import BlogEdit from '@/components/blog_edit'
import BlogManage from '@/components/blog_manage'
import BlogSuccess from '@/components/blog_success'
import BlogDetail from '@/components/blog'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Blogs',
      component: Blogs
    },
    {
      path: '/manager/users',
      name: 'Users',
      component: Users
    },
    {
      path: '/manager/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/manager/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/manager/blog',
      name: 'BlogManage',
      component: BlogManage
    },
    {
      path: '/manager/blog/edit/:id?',
      name: 'BlogEdit',
      component: BlogEdit
    },
    {
      path: '/manager/blog/success',
      name: 'BlogSuccess',
      component: BlogSuccess
    },
    {
      path: '/manager/blog/detail/:id',
      name: 'BlogDetail',
      component: BlogDetail
    }

  ]
})
