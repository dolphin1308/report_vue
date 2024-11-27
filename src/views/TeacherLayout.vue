<template>
  <div class="main-layout">
    <el-aside width="20%" class="aside">
      <el-menu
        :default-active="activeMenu"
        class="menu"
        @select="handleSelect"
        background-color="#304156"
        text-color="#fff"
        active-text-color="#409EFF"
      >
        <div class="logo">
          <h2>教师工作台</h2>
        </div>
        <el-menu-item index="info">
          <el-icon><User /></el-icon>
          <span>个人信息</span>
        </el-menu-item>
        <el-menu-item index="public-report">
          <el-icon><Reading /></el-icon>
          <span>发布报告</span>
        </el-menu-item>
        <el-menu-item index="report">
          <el-icon><Reading /></el-icon>
          <span>我的报告</span>
        </el-menu-item>
        <el-menu-item index="meeting-schedule">
          <el-icon><Reading /></el-icon>
          <span>会议安排</span>
        </el-menu-item>
        <el-menu-item index="history-meeting">
          <el-icon><Reading /></el-icon>
          <span>历史会议</span>
        </el-menu-item>
        <el-menu-item index="message-center">
          <el-icon><Reading /></el-icon>
          <span>消息中心</span>
        </el-menu-item>
        <div v-if="roleStore.role">
          <el-menu-item index="dean-approval">
            <el-icon><Reading /></el-icon>
            <span>院长审批</span>
          </el-menu-item>
        </div>
        <el-menu-item @click="logout">
          <el-icon><Close /></el-icon>
          <span style="color: red">退出登陆</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-main class="main">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </el-main>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Close, Reading, User } from '@element-plus/icons-vue'
import { useRoleStore } from '@/stores/role'

const roleStore = useRoleStore()
const router = useRouter()
const route = useRoute()
const activeMenu = ref('')

const handleSelect = index => {
  router.push(`/teacher/${index}`)
}

const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}

watch(
  () => route.path,
  newPath => {
    activeMenu.value = newPath.split('/').pop()
  },
  { immediate: true },
)

onMounted(() => {
  activeMenu.value = route.path.split('/').pop()
})
</script>

<style scoped>
.main-layout {
  display: flex;
  min-height: 100vh;
}

.aside {
  background-color: #304156;
  min-height: 100vh;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
}

.menu {
  border: none;
  height: 100%;
}

.logo {
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: #fff;
  font-size: 16px;
  border-bottom: 1px solid #1f2d3d;
}

.main {
  padding: 20px;
  background-color: #f0f2f5;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
