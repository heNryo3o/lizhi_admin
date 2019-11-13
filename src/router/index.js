import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [{
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [{
      path: '/redirect/:path*',
      component: () => import('@/views/redirect/index')
    }]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
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
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: '励志语录网管理后台',
        icon: 'dashboard',
        breadcrumb: false
      }
    }]
  }
]

export const asyncRoutes = [{
    path: '/articles',
    component: Layout,
    name: 'Articles',
    meta: {
      title: '文章管理',
      icon: 'store',
      breadcrumb: false
    },
    children: [{
      path: 'article-list',
      component: () => import('@/views/article/article-list'),
      name: 'ArticleList',
      meta: {
        title: '文章列表'
      }
    }]
  },
  {
    path: '/category',
    component: Layout,
    name: 'Category',
    meta: {
      title: '分类管理',
      icon: 'setting',
      breadcrumb: false
    },
    children: [{
        path: 'article',
        component: () => import('@/views/category/article'),
        name: 'Article',
        meta: {
          title: '文章分类'
        }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    name: 'System',
    meta: {
      title: '系统设置',
      icon: 'setting',
      breadcrumb: false
    },
    children: [{
      path: 'banner',
      component: () => import('@/views/system/banner'),
      name: 'Banner',
      meta: {
        title: 'banner设置'
      }
    }]
  },
  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
