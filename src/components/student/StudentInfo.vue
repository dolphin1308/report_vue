<template>
  <div class="student-info-container">
    <el-card class="info-card" :body-style="{ padding: '0px' }">
      <div class="banner">
        <div class="banner-content">
          <div class="avatar-container">
            <el-avatar 
              :size="120" 
              :src="studentInfo.img" 
              class="hover-scale"
            />
          </div>
          <div class="basic-info">
            <h1>{{ studentInfo.name }}</h1>
            <div class="student-no">
              <el-tag size="large" effect="dark" class="hover-scale">
                {{ studentInfo.no }}
              </el-tag>
            </div>
          </div>
        </div>
      </div>

      <div class="info-content">
        <div class="quick-info">
          <div class="info-item hover-scale">
            <i class="el-icon-school"></i>
            <span>{{ studentInfo.grade }}级</span>
          </div>
          <div class="info-item hover-scale">
            <i class="el-icon-office-building"></i>
            <span>{{ studentInfo.major }}</span>
          </div>
          <div class="info-item hover-scale">
            <i class="el-icon-user-solid"></i>
            <span>{{ studentInfo.classInfo }}</span>
          </div>
        </div>

        <el-divider>
          <el-tag type="info" effect="plain">详细信息</el-tag>
        </el-divider>

        <div class="detail-info">
          <el-descriptions 
            :column="2" 
            border 
            class="hover-shadow"
          >
            <el-descriptions-item label="姓名">
              <el-tag size="small" effect="plain" type="success">
                {{ studentInfo.name }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="性别">
              <el-tag 
                size="small" 
                :type="studentInfo.sex === '男' ? 'primary' : 'danger'"
                effect="plain"
              >
                {{ studentInfo.sex }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="生日">
              <el-tag size="small" effect="plain" type="warning">
                {{ formatDate(studentInfo.birthday) }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="年级">
              <el-tag size="small" effect="plain" type="info">
                {{ studentInfo.grade }}级
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="专业">
              {{ studentInfo.major }}
            </el-descriptions-item>
            <el-descriptions-item label="班级">
              {{ studentInfo.classInfo }}
            </el-descriptions-item>
            <el-descriptions-item label="邮箱">
              <a :href="'mailto:' + studentInfo.email" class="email-link">
                {{ studentInfo.email }}
              </a>
            </el-descriptions-item>
            <el-descriptions-item label="电话">
              <a :href="'tel:' + studentInfo.phone" class="phone-link">
                {{ studentInfo.phone }}
              </a>
            </el-descriptions-item>
            <el-descriptions-item label="所属学院">
              {{ studentInfo.collegeName }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getLoginUserInfo } from '@/apis/system'

const studentInfo = ref({})

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN')
}

const fetchStudentInfo = async () => {
  try {
    const response = await getLoginUserInfo()
    if (response.code === 200) {
      studentInfo.value = response.data
    }
  } catch (error) {
    console.error('获取学生信息失败：', error)
  }
}

onMounted(() => {
  fetchStudentInfo()
})
</script>

<style scoped>
.student-info-container {
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
}

.info-card {
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.banner {
  background: linear-gradient(135deg, #1890ff 0%, #36cfc9 100%);
  padding: 40px 20px;
  color: white;
}

.banner-content {
  display: flex;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
}

.avatar-container {
  margin-right: 30px;
}

.avatar-container :deep(.el-avatar) {
  border: 4px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.basic-info {
  h1 {
    margin: 0;
    font-size: 2.5em;
    font-weight: 600;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }
}

.student-no {
  margin-top: 10px;
}

.info-content {
  padding: 30px;
}

.quick-info {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
}

.info-item {
  text-align: center;
  padding: 15px 25px;
  border-radius: 8px;
  background: #f5f7fa;
  
  i {
    font-size: 24px;
    color: #409EFF;
    margin-bottom: 8px;
    display: block;
  }
  
  span {
    color: #606266;
    font-size: 14px;
  }
}

.detail-info {
  margin-top: 30px;
}

.hover-scale {
  transition: transform 0.3s ease;
}

.hover-scale:hover {
  transform: scale(1.05);
}

.hover-shadow {
  transition: box-shadow 0.3s ease;
}

.hover-shadow:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

:deep(.el-descriptions) {
  padding: 20px;
  border-radius: 8px;
  background: #fff;
}

:deep(.el-descriptions__label) {
  width: 120px;
  justify-content: flex-end;
  padding-right: 20px;
  font-weight: bold;
  color: #606266;
}

.email-link, .phone-link {
  color: #409EFF;
  text-decoration: none;
  transition: color 0.3s ease;
}

.email-link:hover, .phone-link:hover {
  color: #66b1ff;
  text-decoration: underline;
}

:deep(.el-divider__text) {
  background-color: transparent;
}

@media (max-width: 768px) {
  .banner-content {
    flex-direction: column;
    text-align: center;
  }
  
  .avatar-container {
    margin: 0 0 20px 0;
  }
  
  .quick-info {
    flex-direction: column;
    gap: 10px;
  }
  
  :deep(.el-descriptions) {
    padding: 10px;
  }
}
</style>
