<template>
  <div class="teacher-info-container">
    <el-card class="info-card" :body-style="{ padding: '0px' }">
      <div class="banner">
        <div class="banner-content">
          <div class="avatar-container">
            <el-avatar 
              :size="120" 
              :src="teacherInfo.img" 
              class="hover-scale"
            />
          </div>
          <div class="basic-info">
            <h1>{{ teacherInfo.name }}</h1>
            <div class="teacher-tags">
              <el-tag size="large" effect="dark" class="hover-scale" type="warning">
                工号：{{ teacherInfo.no }}
              </el-tag>
              <el-tag 
                size="large" 
                effect="dark" 
                class="hover-scale position-tag" 
                type="danger"
              >
                {{ teacherInfo.position }}
              </el-tag>
            </div>
          </div>
        </div>
      </div>

      <div class="info-content">
        <div class="quick-info">
          <div class="info-item hover-scale">
            <el-icon><UserFilled /></el-icon>
            <span>职称</span>
            <div class="info-value">{{ teacherInfo.position }}</div>
          </div>
          <div class="info-item hover-scale">
            <el-icon><School /></el-icon>
            <span>所属学院</span>
            <div class="info-value">{{ teacherInfo.collegeName || '暂无' }}</div>
          </div>
          <div class="info-item hover-scale">
            <el-icon><Medal /></el-icon>
            <span>身份</span>
            <div class="info-value">
              <el-tag 
                v-if="teacherInfo.isCollegeLeader === 1" 
                size="small" 
                type="success"
              >
                院系领导
              </el-tag>
              <el-tag 
                v-if="teacherInfo.isDepartmentLeader === 1" 
                size="small" 
                type="warning"
              >
                部门主管
              </el-tag>
              <span v-if="!teacherInfo.isCollegeLeader && !teacherInfo.isDepartmentLeader">
                普通教师
              </span>
            </div>
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
                {{ teacherInfo.name }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="工号">
              <el-tag size="small" effect="plain" type="warning">
                {{ teacherInfo.no }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="性别">
              <el-tag 
                size="small" 
                :type="teacherInfo.sex === '男' ? 'primary' : 'danger'"
                effect="plain"
              >
                {{ teacherInfo.sex }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="职称">
              <el-tag size="small" effect="plain" type="danger">
                {{ teacherInfo.position }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="出生日期">
              <el-tag size="small" effect="plain" type="info">
                {{ formatDate(teacherInfo.birthday) }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="联系电话">
              <a :href="'tel:' + teacherInfo.phone" class="phone-link">
                {{ teacherInfo.phone }}
              </a>
            </el-descriptions-item>
            <el-descriptions-item label="所属学院">
              {{ teacherInfo.collegeName || '暂无' }}
            </el-descriptions-item>
            <el-descriptions-item label="管理身份">
              <div class="role-tags">
                <el-tag 
                  v-if="teacherInfo.isCollegeLeader === 1" 
                  size="small" 
                  type="success"
                  class="role-tag"
                >
                  院系领导
                </el-tag>
                <el-tag 
                  v-if="teacherInfo.isDepartmentLeader === 1" 
                  size="small" 
                  type="warning"
                  class="role-tag"
                >
                  部门主管
                </el-tag>
                <span v-if="!teacherInfo.isCollegeLeader && !teacherInfo.isDepartmentLeader">
                  普通教师
                </span>
              </div>
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
import { UserFilled, School, Medal } from '@element-plus/icons-vue'

const teacherInfo = ref({})

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN')
}

const fetchTeacherInfo = async () => {
  try {
    const response = await getLoginUserInfo()
    if (response.code === 200) {
      teacherInfo.value = response.data
    }
  } catch (error) {
    console.error('获取教师信息失败：', error)
  }
}

onMounted(() => {
  fetchTeacherInfo()
})
</script>

<style scoped>
.teacher-info-container {
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
  background: linear-gradient(135deg, #E6A23C 0%, #F56C6C 100%);
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

.teacher-tags {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}

.position-tag {
  background: linear-gradient(45deg, #F56C6C, #E6A23C);
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
  padding: 20px 30px;
  border-radius: 12px;
  background: #f5f7fa;
  min-width: 200px;
  
  .el-icon {
    font-size: 28px;
    color: #E6A23C;
    margin-bottom: 8px;
  }
  
  span {
    color: #909399;
    font-size: 14px;
    display: block;
    margin-bottom: 8px;
  }

  .info-value {
    color: #303133;
    font-size: 16px;
    font-weight: 600;
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

.phone-link {
  color: #409EFF;
  text-decoration: none;
  transition: color 0.3s ease;
}

.phone-link:hover {
  color: #66b1ff;
  text-decoration: underline;
}

.role-tags {
  display: flex;
  gap: 8px;
}

.role-tag {
  margin-right: 8px;
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
  
  .teacher-tags {
    justify-content: center;
  }
  
  .quick-info {
    flex-direction: column;
    gap: 15px;
  }
  
  .info-item {
    min-width: unset;
    width: 100%;
  }
  
  :deep(.el-descriptions) {
    padding: 10px;
  }
}
</style>
