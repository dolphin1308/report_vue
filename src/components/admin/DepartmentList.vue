<template>
  <div class="department-list">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <h2>部门管理</h2>
          <div class="header-actions">
            <el-button type="primary" :icon="Plus">添加部门</el-button>
            <el-input
              v-model="searchValue"
              placeholder="搜索部门..."
              class="search-input"
              :prefix-icon="Search"
            />
          </div>
        </div>
      </template>
      
      <el-table 
        :data="departmentList" 
        border 
        style="width: 100%"
        :max-height="tableHeight"
        highlight-current-row>
        <el-table-column prop="no" label="部门编号" width="120" />
        <el-table-column prop="name" label="部门名称" width="150" />
        <el-table-column label="部门部长" width="120">
          <template #default="scope">
            {{ scope.row.leader?.name }}
          </template>
        </el-table-column>
        <el-table-column label="部长职称" width="120">
          <template #default="scope">
            {{ scope.row.leader?.position }}
          </template>
        </el-table-column>
        <el-table-column label="部长电话" width="150">
          <template #default="scope">
            {{ scope.row.leader?.phone }}
          </template>
        </el-table-column>
        <el-table-column label="所属学院" min-width="200">
          <template #default="scope">
            {{ scope.row.college?.name }}
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
        ref="departmentFormRef"
        :model="departmentForm"
        :rules="rules"
        label-width="100px">
        <el-form-item label="部门编号" prop="no">
          <el-input v-model="departmentForm.no" :disabled="isEdit"/>
        </el-form-item>
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="departmentForm.name"/>
        </el-form-item>
        <el-form-item label="部门部长" prop="leaderId">
          <el-select 
            v-model="departmentForm.leaderId"
            filterable
            placeholder="请选择部门部长">
            <el-option
              v-for="teacher in teacherOptions"
              :key="teacher.id"
              :label="teacher.name"
              :value="teacher.id">
              <span>{{ teacher.name }} - {{ teacher.position }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属学院" prop="collegeId">
          <el-select 
            v-model="departmentForm.collegeId"
            filterable
            placeholder="请选择所属学院">
            <el-option
              v-for="college in collegeOptions"
              :key="college.id"
              :label="college.name"
              :value="college.id">
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
import { getAllDepartment, deleteDepartment, updateDepartment } from '@/apis/department'
import { getAllTeacher } from '@/apis/teacher'
import { getAllCollege } from '@/apis/college'
import { Plus, Search, Edit, Delete } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const departmentList = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const searchValue = ref('')
const teacherOptions = ref([])
const collegeOptions = ref([])

const dialogVisible = ref(false)
const dialogTitle = ref('')
const isEdit = ref(false)
const departmentFormRef = ref(null)

const departmentForm = ref({
  id: '',
  no: '',
  name: '',
  leaderId: '',
  collegeId: '',
  password: ''
})

const rules = {
  no: [{ required: true, message: '请输入部门编号', trigger: 'blur' }],
  name: [{ required: true, message: '请输入部门名称', trigger: 'blur' }],
  leaderId: [{ required: true, message: '请选择部门部长', trigger: 'change' }],
  collegeId: [{ required: true, message: '请选择所属学院', trigger: 'change' }]
}

const tableHeight = computed(() => {
  return window.innerHeight - 280
})

// 获取教师列表用于选择部长
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

// 获取学院列表
const fetchColleges = async () => {
  try {
    const response = await getAllCollege(1, 1000)
    if (response.code === 200) {
      collegeOptions.value = response.data.rows
    }
  } catch (error) {
    console.error('获取学院列表失败：', error)
  }
}

const fetchDepartments = async () => {
  try {
    const response = await getAllDepartment(
      currentPage.value,
      pageSize.value,
      '',
      ''
    )
    if (response.code === 200) {
      departmentList.value = response.data.rows
      total.value = response.data.records
    }
  } catch (error) {
    console.error('获取部门列表失败：', error)
  }
}

const handleSizeChange = (val) => {
  pageSize.value = val
  fetchDepartments()
}

const handleCurrentChange = (val) => {
  currentPage.value = val
  fetchDepartments()
}

const handleEdit = (row) => {
  isEdit.value = true
  dialogTitle.value = '编辑部门信息'
  dialogVisible.value = true
  departmentForm.value = { ...row }
}

const handleDelete = (row) => {
  ElMessageBox.confirm(
    `确定要删除部门 ${row.name} 吗？`,
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(async () => {
    try {
      const response = await deleteDepartment(row)
      if (response.code === 200) {
        ElMessage.success('删除成功')
        fetchDepartments()
      } else {
        ElMessage.error(response.message || '删除失败')
      }
    } catch (error) {
      console.error('删除部门失败：', error)
      ElMessage.error('删除失败')
    }
  }).catch(() => {
    ElMessage.info('已取消删除')
  })
}

const submitForm = async () => {
  if (!departmentFormRef.value) return
  
  await departmentFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        const response = await updateDepartment(departmentForm.value)
        if (response.code === 200) {
          ElMessage.success('保存成功')
          dialogVisible.value = false
          fetchDepartments()
        } else {
          ElMessage.error(response.message || '保存失败')
        }
      } catch (error) {
        console.error('保存部门信息失败：', error)
        ElMessage.error('保存失败')
      }
    }
  })
}

const handleClose = (done) => {
  departmentFormRef.value?.resetFields()
  done()
}

onMounted(() => {
  fetchDepartments()
  fetchTeachers()
  fetchColleges()
})
</script>

<style scoped>
.department-list {
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
</style> 