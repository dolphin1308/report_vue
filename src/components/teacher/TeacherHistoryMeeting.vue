<template>
  <div class="history-meeting-container">
    <el-card class="meeting-card">
      <template #header>
        <div class="card-header">
          <h2>历史会议记录</h2>
          <el-tag type="info">共 {{ historyMeetings.length }} 场会议</el-tag>
        </div>
      </template>

      <div v-if="historyMeetings.length === 0" class="empty-state">
        <el-empty description="暂无会议记录" />
      </div>

      <div v-else class="meeting-list">
        <el-timeline>
          <el-timeline-item
            v-for="meeting in historyMeetings"
            :key="meeting.id"
            :timestamp="formatDateTime(meeting.reportTime)"
            :type="getTimelineType(meeting.reportTime)"
          >
            <el-card class="meeting-item hover-shadow">
              <div class="meeting-header">
                <div class="meeting-id">
                  <span>会议ID：{{ meeting.id }}</span>
                  <span class="report-id">报告ID：{{ meeting.reportId }}</span>
                </div>
                <el-tag
                  :type="isExpired(meeting.reportTime) ? 'info' : 'success'"
                >
                  {{ isExpired(meeting.reportTime) ? '已结束' : '进行中' }}
                </el-tag>
              </div>

              <div class="meeting-info">
                <div class="info-item">
                  <el-icon><Location /></el-icon>
                  <span>地点：{{ meeting.address }}</span>
                </div>
                <div class="info-item">
                  <el-icon><Timer /></el-icon>
                  <span
                    >报告时间：{{ formatDateTime(meeting.reportTime) }}</span
                  >
                </div>
                <div class="info-item">
                  <el-icon><AlarmClock /></el-icon>
                  <span
                    >预约截止：{{
                      formatDateTime(meeting.appointmentEnd)
                    }}</span
                  >
                </div>
                <div class="info-item">
                  <el-icon><User /></el-icon>
                  <span>报告人ID：{{ meeting.reporterId }}</span>
                </div>
                <div class="info-item">
                  <el-icon><UserFilled /></el-icon>
                  <span>主持人ID：{{ meeting.presenterId }}</span>
                </div>
                <div class="info-item">
                  <el-icon><Tickets /></el-icon>
                  <span>容量：{{ meeting.capacity }} 人</span>
                </div>
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getTeacherHistoryMeeting } from '@/apis/teacher'
import {
  Location,
  Timer,
  AlarmClock,
  User,
  UserFilled,
  Tickets,
} from '@element-plus/icons-vue'

const historyMeetings = ref([])

const getMeetings = async () => {
  try {
    const res = await getTeacherHistoryMeeting()
    if (res.code === 200) {
      historyMeetings.value = res.data
    }
  } catch (error) {
    console.error('获取历史会议失败：', error)
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

const isExpired = dateString => {
  const now = new Date()
  const meetingTime = new Date(dateString)
  return meetingTime < now
}

const getTimelineType = dateString => {
  return isExpired(dateString) ? 'info' : 'primary'
}

onMounted(() => {
  getMeetings()
})
</script>

<style scoped>
.history-meeting-container {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.meeting-card {
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

.meeting-list {
  padding: 20px;
}

.meeting-item {
  margin-bottom: 10px;
  transition: all 0.3s ease;
}

.hover-shadow:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.meeting-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.meeting-id {
  display: flex;
  gap: 20px;
  color: #409eff;
  font-weight: bold;
}

.report-id {
  color: #67c23a;
}

.meeting-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  margin-top: 15px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #606266;
}

.info-item .el-icon {
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
  .meeting-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .meeting-id {
    flex-direction: column;
    gap: 5px;
  }

  .meeting-info {
    grid-template-columns: 1fr;
  }
}
</style>
