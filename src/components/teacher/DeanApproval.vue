<template>
  <div class="dean-approval">
    <h1>院长审批</h1>
    <el-table :data="paginatedData" style="width: 100%" border>
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="title" label="标题" min-width="200" />
      <el-table-column prop="reporterNo" label="报告人编号" width="120" />
      <el-table-column prop="reporterInfo" label="报告人信息" min-width="150" />
      <el-table-column prop="info" label="报告简介" min-width="200" />
      <el-table-column prop="publishTime" label="发布时间" width="180">
        <template #default="scope">
          {{ formatDate(scope.row.publishTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100">
        <template #default="scope">
          {{ scope.row.status === 0 ? '待审批' : '已审批' }}
        </template>
      </el-table-column>
      <el-table-column prop="checkInfo1" label="审核意见1" min-width="150" />
      <el-table-column prop="checkInfo2" label="审核意见2" min-width="150" />
      <el-table-column label="操作" width="200" fixed="right">
        <template #default="scope">
          <el-button
            type="primary"
            link
            @click="downloadAttachment(scope.row.attachment)"
          >
            下载附件
          </el-button>
          <el-button
            type="primary"
            link
            @click="downloadReport(scope.row.reportFile)"
          >
            下载报告
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 50]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup>
import { getDeanApproval } from '@/apis/teacher'
import { ref, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

const deanApproval = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = computed(() => deanApproval.value.length)

// 计算分页后的数据
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return deanApproval.value.slice(start, end)
})

const handleSizeChange = val => {
  pageSize.value = val
  currentPage.value = 1
}

const handleCurrentChange = val => {
  currentPage.value = val
}

const getApprovalList = async () => {
  try {
    const response = await getDeanApproval()
    deanApproval.value = response.data
  } catch (error) {
    ElMessage.error('获取数据失败')
    console.error(error)
  }
}

const formatDate = dateString => {
  const date = new Date(dateString)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

const downloadAttachment = url => {
  if (!url) {
    ElMessage.warning('附件链接不存在')
    return
  }
  window.open(url)
}

const downloadReport = url => {
  if (!url) {
    ElMessage.warning('报告链接不存在')
    return
  }
  window.open(url)
}

onMounted(() => {
  getApprovalList()
})
</script>

<style scoped>
.dean-approval {
  padding: 20px;
}

.dean-approval h1 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
