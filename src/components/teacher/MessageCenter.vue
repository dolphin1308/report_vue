<template>
  <div class="message-center-container">
    <el-card class="message-card">
      <template #header>
        <div class="card-header">
          <h2>消息中心</h2>
          <div class="header-right">
            <el-tag type="info">共 {{ messages.length }} 条消息</el-tag>
          </div>
        </div>
      </template>

      <div v-if="messages.length === 0" class="empty-state">
        <el-empty description="暂无消息" />
      </div>

      <div v-else class="message-list">
        <el-timeline>
          <el-timeline-item
            v-for="msg in messages"
            :key="msg.id"
            :timestamp="formatDateTime(msg.sendTime)"
            type="primary"
          >
            <el-card class="message-item hover-shadow">
              <div class="message-content">
                <div class="message-header">
                  <el-tag size="small" :type="getMessageType(msg.message)">
                    {{ getMessageTag(msg.message) }}
                  </el-tag>
                  <span class="message-time">{{
                    formatDateTime(msg.sendTime)
                  }}</span>
                </div>
                <div class="message-body">
                  {{ msg.message }}
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
import { getTeacherMessageCenter } from '@/apis/teacher'
import { ref, onMounted } from 'vue'

const messages = ref([])

const getMessages = async () => {
  try {
    const res = await getTeacherMessageCenter()
    if (res.code === 200) {
      messages.value = res.data
    }
  } catch (error) {
    console.error('获取消息失败：', error)
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

const getMessageType = message => {
  if (message.includes('会议安排')) return 'warning'
  if (message.includes('已通过')) return 'success'
  if (message.includes('未通过')) return 'danger'
  return 'info'
}

const getMessageTag = message => {
  if (message.includes('会议安排')) return '会议通知'
  if (message.includes('已通过')) return '审核通过'
  if (message.includes('未通过')) return '审核未通过'
  return '系统通知'
}

onMounted(() => {
  getMessages()
})
</script>

<style scoped>
.message-center-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.message-card {
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

.message-list {
  padding: 20px 0;
}

.message-item {
  margin-bottom: 10px;
  transition: all 0.3s ease;
}

.hover-shadow:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.message-content {
  padding: 10px;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.message-time {
  color: #909399;
  font-size: 14px;
}

.message-body {
  color: #606266;
  line-height: 1.6;
  font-size: 14px;
  white-space: pre-wrap;
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
  .message-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .message-time {
    font-size: 12px;
  }
}
</style>
