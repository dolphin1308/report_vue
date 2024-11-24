<template>
  <div class="student-info">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <h2>个人信息</h2>
        </div>
      </template>

      <el-descriptions
        class="info-descriptions"
        :column="2"
        border>
        <el-descriptions-item label="学号">
          {{ studentInfo.no }}
        </el-descriptions-item>
        <el-descriptions-item label="姓名">
          {{ studentInfo.name }}
        </el-descriptions-item>
        <el-descriptions-item label="性别">
          {{ studentInfo.sex }}
        </el-descriptions-item>
        <el-descriptions-item label="邮箱">
          {{ studentInfo.email }}
        </el-descriptions-item>
        <el-descriptions-item label="电话">
          {{ studentInfo.phone }}
        </el-descriptions-item>
        <el-descriptions-item label="生日">
          {{ studentInfo.birthdayStr }}
        </el-descriptions-item>
        <el-descriptions-item label="年级">
          {{ studentInfo.grade }}
        </el-descriptions-item>
        <el-descriptions-item label="专业">
          {{ studentInfo.major }}
        </el-descriptions-item>
        <el-descriptions-item label="班级">
          {{ studentInfo.classInfo }}
        </el-descriptions-item>
        <el-descriptions-item label="学院">
          {{ studentInfo.collegeName }}
        </el-descriptions-item>
      </el-descriptions>

      <div class="avatar-container">
        <el-avatar 
          :size="120" 
          :src="studentInfo.img"
          class="avatar"
        />
      </div>

      <div class="action-buttons">
        <el-button type="primary" @click="handleEdit">
          修改信息
        </el-button>
        <el-button type="warning" @click="handleChangePassword">
          修改密码
        </el-button>
      </div>
    </el-card>

    <!-- 修改信息对话框 -->
    <el-dialog
      v-model="editDialogVisible"
      title="修改个人信息"
      width="50%">
      <el-form
        ref="editFormRef"
        :model="editForm"
        :rules="rules"
        label-width="100px">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email" />
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="editForm.phone" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitEdit">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 修改密码对话框 -->
    <el-dialog
      v-model="passwordDialogVisible"
      title="修改密码"
      width="40%">
      <el-form
        ref="passwordFormRef"
        :model="passwordForm"
        :rules="passwordRules"
        label-width="100px">
        <el-form-item label="原密码" prop="oldPassword">
          <el-input 
            v-model="passwordForm.oldPassword" 
            type="password"
            show-password
          />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input 
            v-model="passwordForm.newPassword" 
            type="password"
            show-password
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input 
            v-model="passwordForm.confirmPassword" 
            type="password"
            show-password
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="passwordDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitPasswordChange">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

const studentInfo = ref({
  no: '',
  name: '',
  sex: '',
  email: '',
  phone: '',
  birthdayStr: '',
  grade: '',
  major: '',
  classInfo: '',
  collegeName: '',
  img: ''
})

const editDialogVisible = ref(false)
const passwordDialogVisible = ref(false)

const editForm = ref({
  email: '',
  phone: ''
})

const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const rules = {
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入电话', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号格式', trigger: 'blur' }
  ]
}

const passwordRules = {
  oldPassword: [
    { required: true, message: '请输入原密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== passwordForm.value.newPassword) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

// 获取学生信息
const fetchStudentInfo = () => {
  // 这里假设从localStorage获取登录时保存的学生信息
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
  studentInfo.value = userInfo
}

// 处理编辑
const handleEdit = () => {
  editForm.value.email = studentInfo.value.email
  editForm.value.phone = studentInfo.value.phone
  editDialogVisible.value = true
}

// 处理修改密码
const handleChangePassword = () => {
  passwordDialogVisible.value = true
}

// 提交编辑
const submitEdit = () => {
  // 这里添加修改信息的API调用
  ElMessage.success('信息修改成功')
  editDialogVisible.value = false
}

// 提交密码修改
const submitPasswordChange = () => {
  // 这里添加修改密码的API调用
  ElMessage.success('密码修改成功')
  passwordDialogVisible.value = false
}

onMounted(() => {
  fetchStudentInfo()
})
</script>

<style scoped>
.student-info {
  padding: 20px;
}

.box-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info-descriptions {
  margin: 20px 0;
}

.avatar-container {
  display: flex;
  justify-content: center;
  margin: 30px 0;
}

.avatar {
  border: 4px solid #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

:deep(.el-descriptions__cell) {
  padding: 20px;
}

:deep(.el-descriptions__label) {
  width: 100px;
  color: #666;
}

:deep(.el-descriptions__content) {
  color: #333;
}
</style> 