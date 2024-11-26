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
          <h2>部门工作台</h2>
        </div>
        <el-menu-item index="info">
          <el-icon><User /></el-icon>
          <span>个人信息</span>
        </el-menu-item>
        <div v-if="roleStore.role === '教务部'">
          <el-menu-item index="report-review">
            <el-icon><Reading /></el-icon>
            <span>A&A审核</span>
          </el-menu-item>
          <el-menu-item index="report-pass">
            <el-icon><Reading /></el-icon>
            <span>A&A审核通过</span>
          </el-menu-item>
        </div>

        <div v-if="roleStore.role === '宣传部'">
          <el-menu-item index="wait-time">
            <el-icon><ReadingLamp /></el-icon>
            <span>等待排期</span>
          </el-menu-item>
          <el-menu-item index="open-book">
            <el-icon><ReadingLamp /></el-icon>
            <span>开放预约</span>
          </el-menu-item>
          <el-menu-item index="ready-meeting">
            <el-icon><ReadingLamp /></el-icon>
            <span>准备会议</span>
          </el-menu-item>
        </div>
        <el-menu-item index="report-count">
          <el-icon><Reading /></el-icon>
          <span>A&A审核统计</span>
        </el-menu-item>
        <el-menu-item @click="logout">
          <el-icon><Close /></el-icon>
          <span style="color: red">退出登录</span>
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
import { Close, ReadingLamp, User } from '@element-plus/icons-vue'
import { useRoleStore } from '@/stores/role'

const roleStore = useRoleStore()

const router = useRouter()
const route = useRoute()
const activeMenu = ref('')

const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}

const handleSelect = index => {
  router.push(`/department/${index}`)
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
