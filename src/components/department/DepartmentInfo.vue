<template>
  <div class="department-info-container">
    <el-card class="info-card" :body-style="{ padding: '0px' }">
      <div class="banner">
        <div class="banner-content">
          <div class="avatar-container">
            <el-avatar 
              :size="120" 
              :src="departmentInfo.img" 
              class="hover-scale"
            />
          </div>
          <div class="basic-info">
            <h1>{{ departmentInfo.name }}</h1>
            <div class="department-no">
              <el-tag size="large" effect="dark" class="hover-scale" type="success">
                部门编号：{{ departmentInfo.no }}
              </el-tag>
            </div>
          </div>
        </div>
      </div>

      <div class="info-content">
        <div class="quick-info">
          <div class="info-item hover-scale">
            <el-icon><Office /></el-icon>
            <span>部门名称</span>
            <div class="info-value">{{ departmentInfo.name }}</div>
          </div>
          <div class="info-item hover-scale">
            <el-icon><User /></el-icon>
            <span>部门编号</span>
            <div class="info-value">{{ departmentInfo.no }}</div>
          </div>
          <div class="info-item hover-scale">
            <el-icon><School /></el-icon>
            <span>所属学院</span>
            <div class="info-value">{{ departmentInfo.college?.name || '暂无' }}</div>
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
            <el-descriptions-item label="部门名称">
              <el-tag size="small" effect="plain" type="success">
                {{ departmentInfo.name }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="部门编号">
              <el-tag size="small" effect="plain" type="primary">
                {{ departmentInfo.no }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="部门主管">
              <el-tag size="small" effect="plain" type="warning">
                {{ departmentInfo.leader?.name || '暂未���定' }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="所属学院">
              <el-tag size="small" effect="plain" type="info">
                {{ departmentInfo.college?.name || '暂无' }}
              </el-tag>
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
import { 
  OfficeBuilding as Office, 
  User, 
  School 
} from '@element-plus/icons-vue'

const departmentInfo = ref({})

const fetchDepartmentInfo = async () => {
  try {
    const response = await getLoginUserInfo()
    if (response.code === 200) {
      departmentInfo.value = response.data
    }
  } catch (error) {
    console.error('获取部门信息失败：', error)
  }
}

onMounted(() => {
  fetchDepartmentInfo()
})
</script>

<style scoped>
.department-info-container {
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
  background: linear-gradient(135deg, #67C23A 0%, #95D475 100%);
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

.department-no {
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
  padding: 20px 30px;
  border-radius: 12px;
  background: #f5f7fa;
  min-width: 200px;
  
  .el-icon {
    font-size: 28px;
    color: #67C23A;
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
