<template>
  <div class="college-list">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <h2>学院管理</h2>
          <div class="header-actions">
            <el-button type="primary" :icon="Plus">添加学院</el-button>
            <el-input
              v-model="searchValue"
              placeholder="搜索学院..."
              class="search-input"
              :prefix-icon="Search"
            />
          </div>
        </div>
      </template>
      
      <el-table 
        :data="collegeList" 
        border 
        style="width: 100%"
        :max-height="tableHeight"
        highlight-current-row>
        <el-table-column prop="name" label="学院名称" min-width="200" />
        <el-table-column label="院长信息" min-width="400">
          <template #default="scope">
            <el-descriptions :column="3" border size="small">
              <el-descriptions-item label="姓名">
                {{ scope.row.leader?.name }}
              </el-descriptions-item>
              <el-descriptions-item label="职称">
                {{ scope.row.leader?.position }}
              </el-descriptions-item>
              <el-descriptions-item label="联系电话">
                {{ scope.row.leader?.phone }}
              </el-descriptions-item>
            </el-descriptions>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="scope">
            <el-button type="primary" link :icon="Edit" @click="handleEdit(scope.row)">
              编辑
            </el-button>
            <el-button 
              type="danger" 
              link 
              :icon="Delete" 
              @click="handleDelete(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="total"
          :page-sizes="[10, 20, 30, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 添加编辑对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="50%"
      :before-close="handleClose">
      <el-form
        ref="collegeFormRef"
        :model="collegeForm"
        :rules="rules"
        label-width="100px">
        <el-form-item label="学院名称" prop="name">
          <el-input v-model="collegeForm.name"/>
        </el-form-item>
        <el-form-item label="院长" prop="leaderId">
          <el-select 
            v-model="collegeForm.leaderId"
            filterable
            placeholder="请选择院长">
            <el-option
              v-for="teacher in teacherOptions"
              :key="teacher.id"
              :label="teacher.name"
              :value="teacher.id">
              <span>{{ teacher.name }} - {{ teacher.position }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { getAllCollege, deleteCollege, updateCollege } from '@/apis/college'
import { getAllTeacher } from '@/apis/teacher'
import { Plus, Search, Edit, Delete } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const collegeList = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const searchValue = ref('')
const teacherOptions = ref([])

const dialogVisible = ref(false)
const dialogTitle = ref('')
const isEdit = ref(false)
const collegeFormRef = ref(null)

const collegeForm = ref({
  id: '',
  name: '',
  leaderId: ''
})

const rules = {
  name: [{ required: true, message: '请输入学院名称', trigger: 'blur' }],
  leaderId: [{ required: true, message: '请选择院长', trigger: 'change' }]
}

const tableHeight = computed(() => {
  return window.innerHeight - 280
})

// 获取教师列表用于选择院长
const fetchTeachers = async () => {
  try {
    const response = await getAllTeacher(1, 1000, '', '')
    if (response.code === 200) {
      teacherOptions.value = response.data.rows
    }
  } catch (error) {
    console.error('获取教师列表失败：', error)
  }
}

const fetchColleges = async () => {
  try {
    const response = await getAllCollege(
      currentPage.value,
      pageSize.value
    )
    if (response.code === 200) {
      collegeList.value = response.data.rows
      total.value = response.data.records
    }
  } catch (error) {
    console.error('获取学院列表失败：', error)
  }
}

const handleSizeChange = (val) => {
  pageSize.value = val
  fetchColleges()
}

const handleCurrentChange = (val) => {
  currentPage.value = val
  fetchColleges()
}

const handleEdit = (row) => {
  isEdit.value = true
  dialogTitle.value = '编辑学院信息'
  dialogVisible.value = true
  collegeForm.value = { ...row }
}

const handleDelete = (row) => {
  ElMessageBox.confirm(
    `确定要删除学院 ${row.name} 吗？`,
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(async () => {
    try {
      const response = await deleteCollege(row)
      if (response.code === 200) {
        ElMessage.success('删除成功')
        fetchColleges()
      } else {
        ElMessage.error(response.message || '删除失败')
      }
    } catch (error) {
      console.error('删除学院失败：', error)
      ElMessage.error('删除失败')
    }
  }).catch(() => {
    ElMessage.info('已取消删除')
  })
}

const submitForm = async () => {
  if (!collegeFormRef.value) return
  
  await collegeFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        const response = await updateCollege(collegeForm.value)
        if (response.code === 200) {
          ElMessage.success('保存成功')
          dialogVisible.value = false
          fetchColleges()
        } else {
          ElMessage.error(response.message || '保存失败')
        }
      } catch (error) {
        console.error('保存学院信息失败：', error)
        ElMessage.error('保存失败')
      }
    }
  })
}

const handleClose = (done) => {
  collegeFormRef.value?.resetFields()
  done()
}

onMounted(() => {
  fetchColleges()
  fetchTeachers()
})
</script>

<style scoped>
.college-list {
  height: 100%;
}

.box-card {
  margin-bottom: 20px;
  height: calc(100vh - 40px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-actions {
  display: flex;
  gap: 15px;
}

.search-input {
  width: 250px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

:deep(.el-card__body) {
  padding: 10px;
}

:deep(.el-table) {
  margin: 10px 0;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

:deep(.el-form-item) {
  margin-bottom: 20px;
}

:deep(.el-descriptions) {
  padding: 8px 0;
}
</style> 