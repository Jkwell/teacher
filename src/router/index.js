import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login/login.vue'
import Index from '@/components/Index/index.vue'
import User from '@/components/User/changeUser.vue'
import Phone from '@/components/Phone/phone.vue'
import Email from '@/components/Email/email.vue'
import PhoneVertify from '@/components/PhoneVertify/phoneVertify.vue'
import EmailVertify from '@/components/EmailVertify/emailVertify.vue'
import ChangePwd from '@/components/ChangePwd/changepwd.vue'
import ClassList from '@/components/Class/classList.vue'
import CourseList from '@/components/Course/courseList.vue'
import CourseDetail from '@/components/Course/detail.vue'
import CourseStudy from '@/components/Course/study.vue'
import SendMsg from '@/components/Msg/sendMsg.vue'
import Zbreport from '@/components/Report/zbreport.vue'
import Hkreport from '@/components/Report/hkreport.vue'
import Dbreport from '@/components/Report/dbreport.vue'
Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: { name: 'Index' },
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/teacherinfo',
      name: 'teacherInfo',
      component: resolve => require(['@/components/Teacher/tDetail'], resolve),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/changeuser',
      name: 'User',
      component: User,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/phone',
      name: 'Phone',
      component: Phone,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/email',
      name: 'Email',
      component: Email,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/vertifyphone',
      name: 'PhoneVertify',
      component: PhoneVertify,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/vertifyemail',
      name: 'EmailVertify',
      component: EmailVertify,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/changepwd',
      name: 'ChangePwd',
      component: ChangePwd,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/myclass',
      name: 'ClassList',
      component: ClassList,
      meta: {
        requireAuth: true,
        isUseCache: false,
        keepAlive: true
      }
    },
    {
      path: '/mycourse',
      name: 'CourseList',
      component: CourseList,
      meta: {
        requireAuth: true,
        isUseCache: false,
        keepAlive: true
      }
    },
    {
      path: '/coursedetail',
      name: 'CourseDetail',
      component: CourseDetail,
      meta: {
        requireAuth: true,
        isUseCache: false,
        keepAlive: true
      }
    },
    {
      path: '/coursestudy',
      name: 'CourseStudy',
      component: CourseStudy,
      meta: {
        requireAuth: true,
        isUseCache: false,
        keepAlive: true
      }
    },
    {
      path: '/sendmsg',
      name: 'SendMsg',
      component: SendMsg,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/zbreport',
      name: 'Zbreport',
      component: Zbreport
    },
    {
      path: '/hkreport',
      name: 'Hkreport',
      component: Hkreport
    },
    {
      path: '/dbreport',
      name: 'Dbreport',
      component: Dbreport
    }
  ]
})
