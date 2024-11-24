<template>
  <div class="admin-container">
    <el-container>
      <!-- 左侧导航栏 -->
      <el-aside width="200px">
        <div class="sidebar">
          <div class="logo-container">
            <h2>教务管理系统</h2>
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
              <span>控制台</span>
            </el-menu-item>

            <el-sub-menu index="2">
              <template #title>
                <span>用户管理</span>
              </template>
              <el-menu-item index="2-1">教师管理</el-menu-item>
              <el-menu-item index="2-2">学生管理</el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="3">
              <template #title>
                <span>会议中心</span>
              </template>
              <el-menu-item index="3-1">会议预约</el-menu-item>
              <el-menu-item index="3-2">会议记录</el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="4">
              <template #title>
                <span>系统设置</span>
              </template>
              <el-menu-item index="4-1">基础设置</el-menu-item>
              <el-menu-item index="4-2">权限管理</el-menu-item>
              <el-menu-item index="4-3">日志查询</el-menu-item>
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
                <el-breadcrumb-item>控制台</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
            <div class="user-info">
              <el-dropdown>
                <span class="user-dropdown">
                  管理员 <i class="el-icon-arrow-down"></i>
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
          <div class="welcome-panel" v-if="$route.path === '/admin/home'">
            <el-row :gutter="20">
              <el-col
                :span="6"
                v-for="(card, index) in dashboardCards"
                :key="index"
              >
                <el-card shadow="hover" class="data-card">
                  <div class="card-content">
                    <h3>{{ card.title }}</h3>
                    <div class="card-value">{{ card.value }}</div>
                    <div class="card-footer">
                      <span>{{ card.change }}</span>
                      <span :class="card.trend">{{ card.percentage }}</span>
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
  name: 'AdminHome',
  setup() {
    const dashboardCards = ref([
      {
        title: '总用户数',
        value: '1,234',
        change: '较上月',
        percentage: '+5%',
        trend: 'up',
      },
      {
        title: '今日活跃',
        value: '256',
        change: '较昨日',
        percentage: '+2%',
        trend: 'up',
      },
      {
        title: '系统消息',
        value: '12',
        change: '未读消息',
        percentage: '3条',
        trend: 'normal',
      },
      {
        title: '在线用户',
        value: '89',
        change: '当前在线',
        percentage: '23%',
        trend: 'normal',
      },
    ])

    return {
      dashboardCards,
    }
  },
}
</script>

<style scoped>
.admin-container {
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
  margin-left: 200px; /* 为固定定位的侧边栏留出空间 */
}

.data-card {
  height: 180px;
  margin-bottom: 20px;
}

.card-content {
  padding: 20px;
  text-align: center;
}

.card-content h3 {
  margin: 0;
  font-size: 16px;
  color: #666;
}

.card-value {
  font-size: 28px;
  font-weight: bold;
  color: #303133;
  margin: 20px 0;
}

.card-footer {
  font-size: 14px;
  color: #909399;
}

.card-footer .up {
  color: #67c23a;
}

.card-footer .down {
  color: #f56c6c;
}

.welcome-panel {
  margin-top: 20px;
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
    width: 50% !important;
  }
}

@media screen and (max-width: 768px) {
  .el-col {
    width: 100% !important;
  }
}
</style>
