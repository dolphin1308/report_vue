<script setup>
import { ref, onMounted } from 'vue'
import { getWaitingReport } from '@/apis/department'

const waitTimeList = ref([])

const getWaitTime = async () => {
  try {
    const res = await getWaitingReport()
    if (res.code === 200) {
      waitTimeList.value = res.data
    }
  } catch (error) {
    console.error('获取等待排期的报告失败：', error)
  }
}

onMounted(() => {
  getWaitTime()
})
</script>

<template>
  <!-- <div v-for="item in waitTimeList" :key="item.id">
    <el-card>
      <div class="reporter-info">
        <div class="reporter-no">讲师编号：{{ item.reporterNo }}</div>
        <div class="reporter-desc">{{ item.reporterInfo }}</div>
      </div>
    </el-card>
  </div> -->
  <div>
    <h1>等待排期</h1>
  </div>
</template>
