import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    name: 'Login',
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '控制台', icon: 'dashboard', auth: true }
      }
    ]
  },
  {
    path: '/banner',
    component: Layout,
    children: [
      {
        path: '/banner',
        name: 'Banner',
        component: () => import('@/views/banner'),
        meta: { title: '首页标语', icon: 'el-icon-s-home', auth: true }
      }
    ]
  },
  {
    path: '/blog',
    component: Layout,
    redirect: '/blogList',
    name: 'Blog',
    meta: { title: '文章管理', icon: 'el-icon-document', auth: true },
    children: [
      {
        path: '/blogList',
        name: 'BlogList',
        component: () => import('@/views/blog/blogList'),
        meta: { title: '文章列表', icon: 'el-icon-menu', auth: true }
      },
      {
        path: '/blogType',
        name: 'BlogType',
        component: () => import('@/views/blog/blogType'),
        meta: { title: '文章分类', icon: 'el-icon-menu', auth: true }
      },
      {
        path: '/addBlog',
        name: 'AddBlog',
        component: () => import('@/views/blog/addBlog'),
        meta: { title: '添加文章', icon: 'el-icon-menu', auth: true }
      },
      {
        path: '/editBlog/:id',
        name: 'EditBlog',
        component: () => import('@/views/blog/EditBlog'),
        meta: { title: '编辑文章', icon: 'el-icon-menu', auth: true },
        hidden: true
      }
    ]
  },
  {
    path: '/project',
    component: Layout,
    redirect: '/projectList',
    name: 'Project',
    meta: { title: '项目管理', icon: 'el-icon-s-grid', auth: true },
    children: [
      {
        path: '/projectList',
        name: 'ProjectList',
        component: () => import('@/views/project/projectList'),
        meta: { title: '项目列表', icon: 'el-icon-menu', auth: true }
      },
      {
        path: '/addProject',
        name: 'AddProject',
        component: () => import('@/views/project/addProject'),
        meta: { title: '添加项目', icon: 'el-icon-menu', auth: true }
      }
    ]
  },
  {
    path: '/comment',
    component: Layout,
    children: [
      {
        path: '/comment',
        name: 'Comment',
        component: () => import('@/views/comment'),
        meta: { title: '评论管理', icon: 'el-icon-chat-line-round', auth: true }
      }
    ]
  },
  {
    path: '/message',
    component: Layout,
    children: [
      {
        path: '/message',
        name: 'Message',
        component: () => import('@/views/message'),
        meta: { title: '留言板', icon: 'el-icon-position', auth: true }
      }
    ]
  },
  {
    path: '/about',
    component: Layout,
    children: [
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/about'),
        meta: { title: '关于我', icon: 'el-icon-user', auth: true }
      }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    children: [
      {
        path: '/setting',
        name: 'Setting',
        component: () => import('@/views/set'),
        meta: { title: '设置', icon: 'el-icon-setting', auth: true }
      }
    ]
  },
  {
    path: '/personalSetting',
    component: Layout,
    children: [
      {
        path: '/personalSetting',
        name: 'PersonalSetting',
        component: () => import('@/views/personalSetting'),
        meta: { title: '个人中心', auth: true },
        hidden: true
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
