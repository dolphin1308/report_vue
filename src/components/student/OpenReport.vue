<template>
  <div class="open-report-container">
    <el-card class="report-card">
      <template #header>
        <div class="card-header">
          <h2>开放报告列表</h2>
          <el-tag type="info">共 {{ openReport.length }} 个报告</el-tag>
        </div>
      </template>

      <div v-if="openReport.length === 0" class="empty-state">
        <el-empty description="暂无开放报告" />
      </div>

      <div v-else class="report-list">
        <el-card
          v-for="report in openReport"
          :key="report.id"
          class="report-item hover-shadow"
        >
          <div class="report-header">
            <h3 class="report-title">{{ report.title }}</h3>
            <div class="report-status">
              <el-tag :type="getStatusType(report.status)">
                {{ getStatusText(report.status) }}
              </el-tag>
            </div>
          </div>

          <div class="report-content">
            <div class="reporter-info">
              <el-avatar :size="50" icon="el-icon-user" />
              <div class="reporter-details">
                <div class="reporter-no">讲师编号：{{ report.reporterNo }}</div>
                <div class="reporter-desc">{{ report.reporterInfo }}</div>
              </div>
            </div>

            <el-divider />

            <div class="report-details">
              <h4>报告简介</h4>
              <p>{{ report.info }}</p>
            </div>

            <div class="report-files">
              <div class="file-item" v-if="report.attachment">
                <el-button
                  type="primary"
                  link
                  @click="downloadFile(report.attachment, '附件')"
                >
                  <el-icon><Document /></el-icon>
                  下载附件
                </el-button>
              </div>
              <div class="file-item" v-if="report.reportFile">
                <el-button
                  type="success"
                  link
                  @click="downloadFile(report.reportFile, '报告文件')"
                >
                  <el-icon><DocumentCopy /></el-icon>
                  下载报告
                </el-button>
              </div>
            </div>

            <div class="report-actions">
              <el-button
                type="primary"
                :disabled="report.status !== 3"
                @click="handleAppointMeeting(report.id)"
                class="appoint-btn"
              >
                <el-icon><Calendar /></el-icon>
                预约报告
              </el-button>
            </div>

            <div class="report-footer">
              <div class="publish-time">
                发布时间：{{ formatDateTime(report.publishTime) }}
              </div>
              <div
                class="check-info"
                v-if="report.checkInfo1 || report.checkInfo2"
              >
                <el-tooltip
                  v-if="report.checkInfo1"
                  :content="report.checkInfo1"
                  effect="light"
                >
                  <el-tag size="small" type="success">审核意见1</el-tag>
                </el-tooltip>
                <el-tooltip
                  v-if="report.checkInfo2"
                  :content="report.checkInfo2"
                  effect="light"
                >
                  <el-tag size="small" type="warning">审核意见2</el-tag>
                </el-tooltip>
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getOpenReport, studentAppointMeeting } from '@/apis/student'
import { Document, DocumentCopy, Calendar } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const openReport = ref([])

const getReportInfo = async () => {
  try {
    const res = await getOpenReport()
    if (res.code === 200) {
      openReport.value = res.data
    }
  } catch (error) {
    console.error('获取开放报告失败：', error)
  }
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

const getStatusType = status => {
  const statusMap = {
    1: 'info', // 待审核
    2: 'warning', // 审核中
    3: 'success', // 已通过
    4: 'danger', // 已拒绝
  }
  return statusMap[status] || 'info'
}

const getStatusText = status => {
  const statusMap = {
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

const handleAppointMeeting = async reportId => {
  console.log(reportId)
  try {
    const res = await studentAppointMeeting({ reportId })
    if (res.code === 200) {
      ElMessage.success('预约成功')
      await getReportInfo()
    } else {
      ElMessage.error(res.message || '预约失败')
    }
  } catch (error) {
    console.error('预约失败：', error)
    ElMessage.error('预约失败，请稍后重试')
  }
}

onMounted(() => {
  getReportInfo()
})
</script>

<style scoped>
.open-report-container {
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

.report-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.report-item {
  border-radius: 8px;
  transition: all 0.3s ease;
}

.hover-shadow:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.report-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.report-title {
  margin: 0;
  color: #303133;
  font-size: 1.5em;
}

.reporter-info {
  display: flex;
  gap: 15px;
  margin: 15px 0;
}

.reporter-details {
  flex: 1;
}

.reporter-no {
  color: #409eff;
  font-weight: bold;
  margin-bottom: 8px;
}

.reporter-desc {
  color: #606266;
  font-size: 14px;
  line-height: 1.6;
}

.report-details {
  margin: 20px 0;
}

.report-details h4 {
  color: #303133;
  margin-bottom: 10px;
}

.report-details p {
  color: #606266;
  line-height: 1.6;
}

.report-files {
  display: flex;
  gap: 15px;
  margin: 15px 0;
}

.report-actions {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.appoint-btn {
  padding: 12px 24px;
  font-size: 16px;
}

.appoint-btn .el-icon {
  margin-right: 8px;
}

.appoint-btn.is-disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.appoint-btn:not(.is-disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.report-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #ebeef5;
}

.publish-time {
  color: #909399;
  font-size: 14px;
}

.check-info {
  display: flex;
  gap: 10px;
}

.empty-state {
  padding: 40px 0;
  text-align: center;
}

@media (max-width: 768px) {
  .report-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .report-footer {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }

  .reporter-info {
    flex-direction: column;
  }
}
</style>
