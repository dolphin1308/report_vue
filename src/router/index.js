import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import AdminHome from '@/views/AdminHome.vue'
import TeacherHome from '@/views/TeacherHome.vue'
import StudentHome from '@/views/StudentHome.vue'
import StudentList from '@/components/admin/StudentList.vue'
import TeacherList from '@/components/admin/TeacherList.vue'
import DepartmentList from '@/components/admin/DepartmentList.vue'
import CollegeList from '@/components/admin/CollegeList.vue'
import MainLayout from '@/views/MainLayout.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/',
      name: 'main',
      component: MainLayout,
      redirect: '/student-list',
      children: [
        {
          path: 'student-list',
          name: 'StudentList',
          component: StudentList,
          meta: { requiresAuth: true }
        },
        {
          path: 'teacher-list',
          name: 'TeacherList',
          component: TeacherList,
          meta: { requiresAuth: true }
        },
        {
          path: 'department-list',
          name: 'DepartmentList',
          component: DepartmentList,
          meta: { requiresAuth: true }
        },
        {
          path: 'college-list',
          name: 'CollegeList',
          component: CollegeList,
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '/admin/home',
      name: 'AdminHome',
      component: AdminHome,
      meta: { requiresAuth: true, role: 'admin' },
    },
    {
      path: '/teacher/home',
      name: 'TeacherHome',
      component: TeacherHome,
      meta: { requiresAuth: true, role: 'teacher' },
    },
    {
      path: '/student/home',
      name: 'StudentHome',
      component: StudentHome,
      meta: { requiresAuth: true, role: 'student' },
    }
  ]
})

export default router
