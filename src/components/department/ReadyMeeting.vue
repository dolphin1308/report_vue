<template>
  <div>
    <h1>准备会议</h1>
  </div>
</template>

<script setup>
import { getStartingReport } from '@/apis/department'
import { ref, onMounted } from 'vue'

const readyMeeting = ref([])

const getStarting = async () => {
  try {
    const res = await getStartingReport()
    readyMeeting.value = res.data
  } catch (error) {
    console.error('获取即将开始的报告失败：', error)
  }
}

onMounted(() => {
  getStarting()
})
</script>
