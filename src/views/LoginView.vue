<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()

const loginValue = ref({
  no: '',
  password: '',
  role: '',
})

import { UserLogin } from '@/apis/student'
const login = async () => {
  try {
    // 验证表单
    if (!loginValue.value.no || !loginValue.value.password || !loginValue.value.role) {
      ElMessage.warning('请填写完整的登录信息')
      return
    }

    // 根据不同角色处理登录逻辑
    if (loginValue.value.role === 'admin') {
      const res = await UserLogin(loginValue.value)
      if (res.code === 200) {
        ElMessage.success('登录成功')
        console.log(res.data)
        // 存储用户信息
        localStorage.setItem('userInfo', JSON.stringify(res.data))
        localStorage.setItem('userRole', 'admin')
        // 跳转到管理员主界面
        router.push('/student-list')
      } else {
        ElMessage.error(res.message || '登录失败')
      }
    } else if (loginValue.value.role === 'student') {
      const res = await UserLogin(loginValue.value)
      if (res.code === 200) {
        ElMessage.success('登录成功')
        localStorage.setItem('userInfo', JSON.stringify(res.data))
        localStorage.setItem('userRole', 'student')
        router.push('/student/home')
      } else {
        ElMessage.error(res.message || '登录失败')
      }
    } else if (loginValue.value.role === 'teacher') {
      const res = await UserLogin(loginValue.value)
      if (res.code === 200) {
        ElMessage.success('登录成功')
        localStorage.setItem('userInfo', JSON.stringify(res.data))
        localStorage.setItem('userRole', 'teacher')
        router.push('/teacher/home')
      } else {
        ElMessage.error(res.message || '登录失败')
      }
    }
  } catch (error) {
    console.error('登录失败：', error)
    ElMessage.error('登录失败，请检查网络连接')
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <h2>用户登录</h2>
      <div class="input-group">
        <label>用户名</label>
        <input 
          type="text" 
          v-model="loginValue.no" 
          placeholder="请输入用户名" 
          @keyup.enter="login"
        />
      </div>
      <div class="input-group">
        <label>密码</label>
        <input
          type="password"
          v-model="loginValue.password"
          placeholder="请输入密码"
          @keyup.enter="login"
        />
      </div>
      <div class="input-group">
        <label>用户类型</label>
        <select v-model="loginValue.role">
          <option value="">请选择用户类型</option>
          <option value="student">学生</option>
          <option value="teacher">教师</option>
          <option value="admin">管理员</option>
        </select>
      </div>
      <button class="login-btn" @click="login">登录</button>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #1f4037 0%, #99f2c8 100%);
}

.login-box {
  width: 400px;
  padding: 40px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 28px;
}

.input-group {
  margin-bottom: 24px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #666;
  font-size: 14px;
}

input,
select {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition: all 0.3s ease;
}

input:focus,
select:focus {
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.1);
}

.login-btn {
  width: 100%;
  padding: 14px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.login-btn:hover {
  background-color: #66b1ff;
  transform: translateY(-1px);
}

.login-btn:active {
  transform: translateY(0);
}

/* 添加输入框动画效果 */
input, select {
  transform: translateY(0);
  transition: transform 0.3s ease;
}

input:focus, select:focus {
  transform: translateY(-2px);
}
</style>
