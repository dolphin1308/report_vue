import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import StudentList from '@/components/admin/StudentList.vue'
import TeacherList from '@/components/admin/TeacherList.vue'
import DepartmentList from '@/components/admin/DepartmentList.vue'
import CollegeList from '@/components/admin/CollegeList.vue'
import AdminLayout from '@/views/AdminLayout.vue'
import StudentLayout from '../views/StudentLayout.vue'
import TeacherLayout from '../views/TeacherLayout.vue'
import DepartmentLayout from '../views/DepartmentLayout.vue'
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
      component: AdminLayout,
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
      path: '/student/home',
      component: StudentLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          component: () => import('../views/StudentLayout.vue')
        }
      ]
    },
    {
      path: '/teacher/home',
      component: TeacherLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          component: () => import('../views/TeacherLayout.vue')
        }
      ]
    },
    {
      path: '/department/home',
      component: DepartmentLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          component: () => import('../views/DepartmentLayout.vue')
        }
      ]
    }
  ]
})

export default router
