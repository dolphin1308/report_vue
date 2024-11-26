<template>
  <div class="report-history-container">
    <el-card class="history-card">
      <template #header>
        <div class="card-header">
          <h2>报告历史记录</h2>
          <el-tag type="info">共 {{ reportHistory.length }} 条记录</el-tag>
        </div>
      </template>

      <el-timeline>
        <el-timeline-item
          v-for="report in reportHistory"
          :key="report.id"
          :timestamp="formatDate(report.reportTime)"
          :type="getTimelineItemType(report.reportTime)"
        >
          <el-card class="report-card hover-shadow">
            <div class="report-info">
              <div class="report-header">
                <span class="report-id">报告编号：{{ report.reportId }}</span>
                <el-tag :type="getStatusType(report.reportTime)" size="small">
                  {{ getStatusText(report.reportTime) }}
                </el-tag>
              </div>

              <div class="report-details">
                <div class="detail-item">
                  <el-icon><Location /></el-icon>
                  <span>地点：{{ report.address }}</span>
                </div>
                <div class="detail-item">
                  <el-icon><Calendar /></el-icon>
                  <span>报告时间：{{ formatDateTime(report.reportTime) }}</span>
                </div>
                <div class="detail-item">
                  <el-icon><User /></el-icon>
                  <span>主讲人ID：{{ report.presenterId }}</span>
                </div>
                <div class="detail-item">
                  <el-icon><UserFilled /></el-icon>
                  <span>容量：{{ report.capacity }}人</span>
                </div>
                <div class="detail-item">
                  <el-icon><Timer /></el-icon>
                  <span
                    >预约截止：{{ formatDateTime(report.appointmentEnd) }}</span
                  >
                </div>
              </div>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>

      <div v-if="reportHistory.length === 0" class="empty-state">
        <el-empty description="暂无报告历史记录" />
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getReportHistory } from '@/apis/student'
import {
  Location,
  Calendar,
  User,
  UserFilled,
  Timer,
} from '@element-plus/icons-vue'

const reportHistory = ref([])

const fetchReportHistory = async () => {
  try {
    const response = await getReportHistory()
    console.log('response:' + response.data)
    if (response.code === 200) {
      reportHistory.value = response.data
    }
  } catch (error) {
    console.error('获取报告历史失败：', error)
  }
  console.log(reportHistory.value)
}

const formatDate = dateString => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN')
}

const formatDateTime = dateString => {
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

const getTimelineItemType = dateString => {
  const now = new Date()
  const reportDate = new Date(dateString)
  return reportDate > now ? 'primary' : 'info'
}

const getStatusType = dateString => {
  const now = new Date()
  const reportDate = new Date(dateString)
  if (reportDate > now) return 'warning'
  return 'success'
}

const getStatusText = dateString => {
  const now = new Date()
  const reportDate = new Date(dateString)
  if (reportDate > now) return '未开始'
  return '已结束'
}

onMounted(() => {
  fetchReportHistory()
})
</script>

<style scoped>
.report-history-container {
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
}

.history-card {
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

.report-card {
  margin-bottom: 10px;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.hover-shadow:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.report-info {
  padding: 10px;
}

.report-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.report-id {
  font-weight: bold;
  color: #409eff;
}

.report-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #606266;
}

.detail-item .el-icon {
  color: #909399;
}

.empty-state {
  padding: 40px 0;
  text-align: center;
}

:deep(.el-timeline-item__node) {
  background-color: #409eff;
}

:deep(.el-timeline-item__tail) {
  border-left-color: #e4e7ed;
}

@media (max-width: 768px) {
  .report-details {
    grid-template-columns: 1fr;
  }

  .report-header {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }
}
</style>
