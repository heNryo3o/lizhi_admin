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
        title: '我爱赚钱网管理后台',
        icon: 'dashboard',
        breadcrumb: false
      }
    }]
  }
]

export const asyncRoutes = [{
    path: '/apps',
    component: Layout,
    name: 'Apps',
    meta: {
      title: '应用管理',
      icon: 'store',
      breadcrumb: false
    },
    children: [{
      path: 'app-list',
      component: () => import('@/views/apps/app-list'),
      name: 'AppList',
      meta: {
        title: '应用列表'
      }
    }]
  },
  {
    path: '/news',
    component: Layout,
    name: 'News',
    meta: {
      title: '资讯管理',
      icon: 'store',
      breadcrumb: false
    },
    children: [{
      path: 'news-list',
      component: () => import('@/views/news/news-list'),
      name: 'NewsList',
      meta: {
        title: '资讯列表'
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
        path: 'apps',
        component: () => import('@/views/category/apps'),
        name: 'Apps',
        meta: {
          title: '应用分类'
        }
      },
      {
        path: 'news',
        component: () => import('@/views/category/news'),
        name: 'News',
        meta: {
          title: '资讯分类'
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
