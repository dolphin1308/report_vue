<template>
  <div>
    <label for="selection">Choose an option:</label>
    <select id="selection" v-model="selectedOption">
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="other">Other</option>
    </select>

    <!-- 使用 v-if 指令来控制文本输入框的显示 -->
    <div v-if="selectedOption === 'other'">
      <label for="otherInput">Please specify:</label>
      <input type="text" id="otherInput" v-model="otherInput" />
    </div>
  </div>
</template>

<script setup>
import { getAuditRecord } from '@/apis/system'
import { ref, onMounted } from 'vue'

const selectedOption = ref('')
const otherInput = ref('')

const reviewList = ref([])

const getReview = async () => {
  const res = await getAuditRecord()
  if (res.code === 200) {
    reviewList.value = res.data
  } else {
    console.error('获取审核记录失败')
  }
}

onMounted(() => {
  getReview()
})
</script>

<style scoped>
/* 添加一些简单的样式 */
label {
  display: block;
  margin-top: 10px;
}
input,
select {
  margin-top: 5px;
}
</style>
