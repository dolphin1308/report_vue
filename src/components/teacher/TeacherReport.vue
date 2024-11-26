<template>
  <div class="teacher-report-container">
    <el-card class="report-card">
      <template #header>
        <div class="card-header">
          <h2>我的报告列表</h2>
          <div class="header-actions">
            <el-button type="primary" @click="handleAddReport">
              <el-icon><Plus /></el-icon>
              新建报告
            </el-button>
          </div>
        </div>
      </template>

      <div v-if="teacherReports.length === 0" class="empty-state">
        <el-empty description="暂无报告记录" />
      </div>

      <div v-else class="report-list">
        <el-collapse accordion>
          <el-collapse-item
            v-for="report in teacherReports"
            :key="report.id"
            :name="report.id"
          >
            <template #title>
              <div class="collapse-header">
                <span class="report-title">{{ report.title }}</span>
                <div class="report-badges">
                  <el-tag :type="getStatusType(report.status)" size="small">
                    {{ getStatusText(report.status) }}
                  </el-tag>
                  <span class="publish-time"
                    >发布于：{{ formatDate(report.publishTime) }}</span
                  >
                </div>
              </div>
            </template>

            <div class="report-content">
              <div class="info-section">
                <h4>讲者信息</h4>
                <p>{{ report.reporterInfo }}</p>
              </div>

              <div class="info-section">
                <h4>报告简介</h4>
                <p>{{ report.info }}</p>
              </div>

              <div class="file-section">
                <div class="file-item" v-if="report.attachment">
                  <el-button
                    type="primary"
                    link
                    @click="downloadFile(report.attachment)"
                  >
                    <el-icon><Document /></el-icon>
                    下载附件
                  </el-button>
                </div>
                <div class="file-item" v-if="report.reportFile">
                  <el-button
                    type="success"
                    link
                    @click="downloadFile(report.reportFile)"
                  >
                    <el-icon><DocumentCopy /></el-icon>
                    下载报告文件
                  </el-button>
                </div>
              </div>

              <el-divider />

              <div class="review-section">
                <div class="review-item" v-if="report.checkInfo1 !== '-'">
                  <h4>审核意见1</h4>
                  <el-tag size="small" effect="plain" type="success">
                    {{ report.checkInfo1 }}
                  </el-tag>
                </div>
                <div class="review-item" v-if="report.checkInfo2 !== '-'">
                  <h4>审核意见2</h4>
                  <el-tag size="small" effect="plain" type="warning">
                    {{ report.checkInfo2 }}
                  </el-tag>
                </div>
              </div>

              <div class="action-section">
                <el-button
                  type="primary"
                  :disabled="report.status === 4"
                  @click="handleEdit(report)"
                >
                  编辑
                </el-button>
                <el-button
                  type="danger"
                  :disabled="report.status === 4"
                  @click="handleDelete(report.id)"
                >
                  删除
                </el-button>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Document, DocumentCopy, Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { getTeacherReport } from '@/apis/teacher'

const teacherReports = ref([])

const getReports = async () => {
  try {
    const res = await getTeacherReport()
    if (res.code === 200) {
      teacherReports.value = res.data
    }
  } catch (error) {
    console.error('获取报告列表失败：', error)
  }
}

const formatDate = dateString => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const getStatusType = status => {
  const statusMap = {
    0: 'info', // 草稿
    1: 'warning', // 待审核
    2: 'primary', // 审核中
    3: 'success', // 已通过
    4: 'danger', // 已拒绝
  }
  return statusMap[status] || 'info'
}

const getStatusText = status => {
  const statusMap = {
    0: '草稿',
    1: '待审核',
    2: '审核中',
    3: '已通过',
    4: '已拒绝',
  }
  return statusMap[status] || '未知状态'
}

const downloadFile = url => {
  window.open(url, '_blank')
}

const handleAddReport = () => {
  // TODO: 实现新建报告功能
  ElMessage.info('新建报告功能开发中')
}

// const handleEdit = report => {
//   // TODO: 实现编辑报告功能
//   ElMessage.info('编辑报告功能开发中')
// }

// const handleDelete = id => {
//   ElMessageBox.confirm('确定要删除这个报告吗？此操作不可逆', '警告', {
//     confirmButtonText: '确定',
//     cancelButtonText: '取消',
//     type: 'warning',
//   })
//     .then(() => {
//       // TODO: 实现删除报告功能
//       ElMessage.success('删除成功')
//     })
//     .catch(() => {
//       ElMessage.info('已取消删除')
//     })
// }

onMounted(() => {
  getReports()
})
</script>

<style scoped>
.teacher-report-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.report-card {
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h2 {
  margin: 0;
  color: #303133;
}

.collapse-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.report-title {
  font-weight: bold;
  color: #303133;
  margin-right: 20px;
}

.report-badges {
  display: flex;
  align-items: center;
  gap: 12px;
}

.publish-time {
  color: #909399;
  font-size: 14px;
}

.report-content {
  padding: 20px;
}

.info-section {
  margin-bottom: 20px;
}

.info-section h4 {
  color: #303133;
  margin-bottom: 10px;
}

.info-section p {
  color: #606266;
  line-height: 1.6;
  white-space: pre-wrap;
}

.file-section {
  display: flex;
  gap: 20px;
  margin: 20px 0;
}

.review-section {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 20px 0;
}

.review-item h4 {
  margin-bottom: 8px;
  color: #303133;
}

.action-section {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.empty-state {
  padding: 40px 0;
  text-align: center;
}

:deep(.el-collapse-item__header) {
  font-size: 16px;
}

:deep(.el-collapse-item__content) {
  padding: 0;
}

@media (max-width: 768px) {
  .collapse-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .report-badges {
    flex-wrap: wrap;
  }

  .file-section {
    flex-direction: column;
  }

  .action-section {
    flex-wrap: wrap;
  }
}
</style>
