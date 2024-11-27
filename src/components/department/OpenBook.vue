<template>
  <div>
    <h1>开放预约</h1>
  </div>
</template>

<script setup>
import { getOpenReport } from '@/apis/department'
import { ref, onMounted } from 'vue'

const openReport = ref([])

const getOpen = async () => {
  try {
    const res = await getOpenReport()
    if (res.code === 200) {
      openReport.value = res.data
    }
  } catch (error) {
    console.error('获取开放预约报告失败：', error)
  }
}

onMounted(() => {
  getOpen()
})
</script>
