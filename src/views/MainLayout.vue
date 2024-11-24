<template>
  <div class="main-layout">
    <!-- 侧边导航栏 -->
    <el-aside width="20%" class="aside">
      <el-menu
        :default-active="activeMenu"
        class="menu"
        @select="handleSelect"
        background-color="#304156"
        text-color="#fff"
        active-text-color="#409EFF">
        <div class="logo">
          <h2>学术报告管理系统</h2>
        </div>
        <el-menu-item index="student-list">
          <el-icon><User /></el-icon>
          <span>学生管理</span>
        </el-menu-item>
        <el-menu-item index="teacher-list">
          <el-icon><UserFilled /></el-icon>
          <span>教师管理</span>
        </el-menu-item>
        <el-menu-item index="department-list">
          <el-icon><Management /></el-icon>
          <span>部门管理</span>
        </el-menu-item>
        <el-menu-item index="college-list">
          <el-icon><Reading /></el-icon>
          <span>学院管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 主内容区 -->
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
import { 
  User, 
  UserFilled, 
  Management, 
  Reading 
} from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
const activeMenu = ref('')

const handleSelect = (index) => {
  router.push(`/${index}`)
}

// 监听路由变化
watch(() => route.path, (newPath) => {
  activeMenu.value = newPath.split('/')[1]
}, { immediate: true })

onMounted(() => {
  activeMenu.value = route.path.split('/')[1]
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