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
import StudentInfo from '@/components/student/StudentInfo.vue'
import TeacherInfo from '@/components/teacher/TeacherInfo.vue'
import DepartmentInfo from '@/components/department/DepartmentInfo.vue'
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
          meta: { requiresAuth: true },
        },
        {
          path: 'teacher-list',
          name: 'TeacherList',
          component: TeacherList,
          meta: { requiresAuth: true },
        },
        {
          path: 'department-list',
          name: 'DepartmentList',
          component: DepartmentList,
          meta: { requiresAuth: true },
        },
        {
          path: 'college-list',
          name: 'CollegeList',
          component: CollegeList,
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: '/student',
      component: StudentLayout,
      redirect: '/student/info',
      meta: { requiresAuth: true },
      children: [
        {
          path: 'info',
          component: StudentInfo,
        },
        {
          path: 'report-history',
          component: () => import('@/components/student/ReportHistory.vue'),
        },
        {
          path: 'open-report',
          component: () => import('@/components/student/OpenReport.vue'),
        },
      ],
    },
    {
      path: '/teacher',
      component: TeacherLayout,
      redirect: '/teacher/info',
      meta: { requiresAuth: true },
      children: [
        {
          path: 'info',
          component: TeacherInfo,
        },
        {
          path: 'report',
          component: () => import('@/components/teacher/TeacherReport.vue'),
        },
        {
          path: 'meeting-schedule',
          component: () => import('@/components/teacher/MeetingSchedule.vue'),
        },
        {
          path: 'history-meeting',
          component: () =>
            import('@/components/teacher/TeacherHistoryMeeting.vue'),
        },
        {
          path: 'message-center',
          component: () => import('@/components/teacher/MessageCenter.vue'),
        },
      ],
    },
    {
      path: '/department',
      component: DepartmentLayout,
      redirect: '/department/info',
      meta: { requiresAuth: true },
      children: [
        {
          path: 'info',
          component: DepartmentInfo,
        },
        {
          path: 'report-review',
          component: () =>
            import('@/components/department/AAOReportReview.vue'),
        },
        {
          path: 'report-pass',
          component: () => import('@/components/department/AAOReportPass.vue'),
        },
        {
          path: 'report-count',
          component: () => import('@/components/department/AAOReportCount.vue'),
        },
        {
          path: 'wait-time',
          component: () => import('@/components/department/WaitTime.vue'),
        },
        {
          path: 'open-book',
          component: () => import('@/components/department/OpenBook.vue'),
        },
        {
          path: 'ready-meeting',
          component: () => import('@/components/department/ReadyMeeting.vue'),
        },
      ],
    },
  ],
})

export default router
