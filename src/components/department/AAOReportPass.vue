<template>
  <div class="report-pass-container">
    <el-card class="report-card">
      <template #header>
        <div class="card-header">
          <h2>已通过审核的报告</h2>
          <div class="header-right">
            <el-tag type="success">共 {{ reports.length }} 个报告</el-tag>
          </div>
        </div>
      </template>

      <div v-if="reports.length === 0" class="empty-state">
        <el-empty description="暂无已通过的报告" />
      </div>

      <div v-else class="report-list">
        <el-collapse accordion>
          <el-collapse-item
            v-for="report in reports"
            :key="report.id"
            :name="report.id"
          >
            <template #title>
              <div class="collapse-header">
                <span class="report-title">{{ report.title }}</span>
                <div class="report-meta">
                  <el-tag size="small" type="success">已通过审核</el-tag>
                  <span class="publish-time"
                    >发布于：{{ formatDateTime(report.publishTime) }}</span
                  >
                </div>
              </div>
            </template>

            <div class="report-content">
              <div class="reporter-info">
                <h4>讲者信息</h4>
                <div class="reporter-no">讲师编号：{{ report.reporterNo }}</div>
                <div class="reporter-desc">{{ report.reporterInfo }}</div>
              </div>

              <el-divider />

              <div class="report-info">
                <h4>报告简介</h4>
                <div class="info-text">{{ report.info }}</div>
              </div>

              <el-divider />

              <div class="review-info">
                <div class="review-item">
                  <h4>学院院长审核意见</h4>
                  <el-tag size="small" effect="plain" type="success">
                    {{ report.checkInfo1 }}
                  </el-tag>
                </div>
                <div class="review-item">
                  <h4>教务部门审核意见</h4>
                  <el-tag size="small" effect="plain" type="success">
                    {{ report.checkInfo2 }}
                  </el-tag>
                </div>
              </div>

              <div class="file-section">
                <el-button
                  type="primary"
                  link
                  @click="downloadFile(report.attachment)"
                  v-if="report.attachment"
                >
                  <el-icon><Document /></el-icon>
                  下载附件
                </el-button>
                <el-button
                  type="success"
                  link
                  @click="downloadFile(report.reportFile)"
                  v-if="report.reportFile"
                >
                  <el-icon><DocumentCopy /></el-icon>
                  下载报告文件
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
import { getPassedAAOReport } from '@/apis/department'
import { Document, DocumentCopy } from '@element-plus/icons-vue'

const reports = ref([])

const getReports = async () => {
  try {
    const res = await getPassedAAOReport()
    if (res.code === 200) {
      reports.value = res.data
    }
  } catch (error) {
    console.error('获取报告列表失败：', error)
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

const downloadFile = url => {
  if (url) {
    window.open(url, '_blank')
  }
}

onMounted(() => {
  getReports()
})
</script>

<style scoped>
.report-pass-container {
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
  font-size: 16px;
}

.report-meta {
  display: flex;
  align-items: center;
  gap: 15px;
}

.publish-time {
  color: #909399;
  font-size: 14px;
}

.report-content {
  padding: 20px;
}

.reporter-info {
  margin-bottom: 20px;
}

.reporter-no {
  color: #409eff;
  font-weight: bold;
  margin: 10px 0;
}

.reporter-desc {
  color: #606266;
  line-height: 1.6;
  white-space: pre-wrap;
}

.report-info {
  margin: 20px 0;
}

.info-text {
  color: #606266;
  line-height: 1.6;
  white-space: pre-wrap;
}

.review-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.review-item h4 {
  margin-bottom: 10px;
  color: #303133;
}

.file-section {
  display: flex;
  gap: 20px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #ebeef5;
}

.empty-state {
  padding: 40px 0;
  text-align: center;
}

h4 {
  margin: 0;
  color: #303133;
  font-size: 16px;
}

@media (max-width: 768px) {
  .collapse-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .report-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }

  .review-info {
    grid-template-columns: 1fr;
  }

  .file-section {
    flex-direction: column;
  }
}
</style>
