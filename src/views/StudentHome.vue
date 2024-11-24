<template>
  <div class="student-container">
    <el-container>
      <!-- 左侧导航栏 -->
      <el-aside width="200px">
        <div class="sidebar">
          <div class="logo-container">
            <h2>学生信息平台</h2>
          </div>
          <el-menu
            default-active="1"
            class="nav-menu"
            background-color="#001529"
            text-color="#fff"
            active-text-color="#409EFF"
            :unique-opened="true"
          >
            <el-menu-item index="1">
              <span>我的主页</span>
            </el-menu-item>

            <el-sub-menu index="2">
              <template #title>
                <span>课程学习</span>
              </template>
              <el-menu-item index="2-1">课程表</el-menu-item>
              <el-menu-item index="2-2">选课系统</el-menu-item>
              <el-menu-item index="2-3">在线学习</el-menu-item>
            </el-sub-menu>

            <el-menu-item index="3">
              <span>成绩查询</span>
            </el-menu-item>

            <el-sub-menu index="4">
              <template #title>
                <span>会议活动</span>
              </template>
              <el-menu-item index="4-1">活动日历</el-menu-item>
              <el-menu-item index="4-2">我的活动</el-menu-item>
            </el-sub-menu>

            <el-menu-item index="5">
              <span>消息中心</span>
            </el-menu-item>

            <el-menu-item index="6">
              <span>个人中心</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-aside>

      <!-- 右侧内容区 -->
      <el-container>
        <!-- 顶部信息栏 -->
        <el-header height="60px">
          <div class="header-content">
            <div class="breadcrumb">
              <el-breadcrumb separator="/">
                <el-breadcrumb-item>首页</el-breadcrumb-item>
                <el-breadcrumb-item>我的主页</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
            <div class="user-info">
              <el-dropdown>
                <span class="user-dropdown">
                  学生 <i class="el-icon-arrow-down"></i>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>个人信息</el-dropdown-item>
                    <el-dropdown-item>修改密码</el-dropdown-item>
                    <el-dropdown-item divided>退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
        </el-header>

        <!-- 主要内容区 -->
        <el-main>
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>

          <!-- 默认欢迎页面 -->
          <div class="welcome-panel" v-if="$route.path === '/student/home'">
            <el-row :gutter="20">
              <el-col :span="16">
                <el-card shadow="hover" class="schedule-card">
                  <template #header>
                    <div class="card-header">
                      <span>今日课程安排</span>
                    </div>
                  </template>
                  <el-timeline>
                    <el-timeline-item
                      v-for="(course, index) in todayCourses"
                      :key="index"
                      :timestamp="course.time"
                      :type="course.type"
                    >
                      {{ course.name }} - {{ course.location }}
                    </el-timeline-item>
                  </el-timeline>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover" class="notice-card">
                  <template #header>
                    <div class="card-header">
                      <span>通知公告</span>
                    </div>
                  </template>
                  <div class="notice-list">
                    <div
                      v-for="(notice, index) in notices"
                      :key="index"
                      class="notice-item"
                    >
                      <el-tag size="small" :type="notice.type">{{
                        notice.tag
                      }}</el-tag>
                      <span>{{ notice.content }}</span>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'StudentHome',
  setup() {
    const todayCourses = ref([
      {
        time: '8:00-9:40',
        name: '高等数学',
        location: '教学楼A101',
        type: 'primary',
      },
      {
        time: '10:00-11:40',
        name: '大学英语',
        location: '教学楼B203',
        type: 'success',
      },
      {
        time: '14:00-15:40',
        name: '程序设计',
        location: '实验楼C305',
        type: 'warning',
      },
    ])

    const notices = ref([
      { type: 'warning', tag: '考试', content: '下周一高数期中考试' },
      { type: 'info', tag: '通知', content: '本周五班会' },
      { type: 'success', tag: '活动', content: '社团招新开始' },
    ])

    return {
      todayCourses,
      notices,
    }
  },
}
</script>

<style scoped>
.student-container {
  height: 100vh;
  background-color: #f0f2f5;
}

.sidebar {
  height: 100vh;
  background-color: #001529;
  position: fixed;
  width: 200px;
  z-index: 1000;
}

.logo-container {
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: #fff;
  font-size: 16px;
  border-bottom: 1px solid #002140;
}

.logo-container h2 {
  color: #fff;
  margin: 0;
  font-size: 18px;
}

.nav-menu {
  border: none;
}

.el-menu-item,
.el-sub-menu__title {
  height: 50px;
  line-height: 50px;
  font-size: 14px;
}

.el-header {
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  position: relative;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 20px;
}

.user-dropdown {
  cursor: pointer;
  color: #666;
}

.el-main {
  padding: 20px;
  margin-left: 200px;
}

.schedule-card,
.notice-card {
  margin-bottom: 20px;
}

.notice-list {
  padding: 0 10px;
}

.notice-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.notice-item span {
  color: #606266;
  font-size: 14px;
}

.el-timeline {
  padding: 0 20px;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 响应式调整 */
@media screen and (max-width: 1200px) {
  .el-col {
    width: 100% !important;
  }
}
</style>
