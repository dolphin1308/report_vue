<template>
  <div class="student-list">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <h2>学生管理</h2>
          <div class="header-actions">
            <el-button type="primary" :icon="Plus">添加学生</el-button>
            <el-input
              v-model="searchValue"
              placeholder="搜索学生..."
              class="search-input"
              :prefix-icon="Search"
            />
          </div>
        </div>
      </template>
      
      <el-table 
        :data="studentList" 
        border 
        style="width: 100%"
        :max-height="tableHeight"
        highlight-current-row>
        <el-table-column prop="no" label="学号" width="120" />
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="sex" label="性别" width="80" />
        <el-table-column prop="email" label="邮箱" min-width="200" />
        <el-table-column prop="phone" label="电话" width="150" />
        <el-table-column prop="birthdayStr" label="生日" width="120" />
        <el-table-column prop="grade" label="年级" width="100" />
        <el-table-column prop="major" label="专业" min-width="200" />
        <el-table-column prop="classInfo" label="班级" width="100" />
        <el-table-column prop="collegeName" label="学院" min-width="200" />
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
        ref="studentFormRef"
        :model="studentForm"
        :rules="rules"
        label-width="100px">
        <el-form-item label="学号" prop="no">
          <el-input v-model="studentForm.no" :disabled="isEdit"/>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="studentForm.name"/>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="studentForm.sex">
            <el-option label="男" value="男"/>
            <el-option label="女" value="女"/>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="studentForm.email"/>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="studentForm.phone"/>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-date-picker
            v-model="studentForm.birthday"
            type="date"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="年级" prop="grade">
          <el-input-number v-model="studentForm.grade" :min="2000" :max="2030"/>
        </el-form-item>
        <el-form-item label="专业" prop="major">
          <el-input v-model="studentForm.major"/>
        </el-form-item>
        <el-form-item label="班级" prop="classInfo">
          <el-input v-model="studentForm.classInfo"/>
        </el-form-item>
        <el-form-item label="学院" prop="collegeName">
          <el-input v-model="studentForm.collegeName"/>
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
import { getAllStudent, deleteStudent, updateStudent } from '@/apis/student'
import { Plus, Search, Edit, Delete } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const studentList = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const searchValue = ref('')

const dialogVisible = ref(false)
const dialogTitle = ref('')
const isEdit = ref(false)
const studentFormRef = ref(null)

const studentForm = ref({
  id: '',
  no: '',
  name: '',
  sex: '',
  email: '',
  phone: '',
  birthday: '',
  grade: 2023,
  major: '',
  classInfo: '',
  collegeName: '',
  collegeId: '',
  password: ''
})

const rules = {
  no: [{ required: true, message: '请输入学号', trigger: 'blur' }],
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  phone: [{ required: true, message: '请输入电话', trigger: 'blur' }],
  grade: [{ required: true, message: '请输入年级', trigger: 'blur' }],
  major: [{ required: true, message: '请输入专业', trigger: 'blur' }],
  classInfo: [{ required: true, message: '请输入班级', trigger: 'blur' }],
  collegeName: [{ required: true, message: '请输入学院', trigger: 'blur' }]
}

// 动态计算表格高度
const tableHeight = computed(() => {
  return window.innerHeight - 280 // 根据实际情况调整
})

const fetchStudents = async () => {
  try {
    const response = await getAllStudent(
      currentPage.value,
      pageSize.value,
      '', // searchField
      ''  // searchString
    )
    console.log(response)
    if (response.code === 200) {
      studentList.value = response.data.rows
      total.value = response.data.records
    }
  } catch (error) {
    console.error('获取学生列表失败：', error)
  }
}

const handleSizeChange = (val) => {
  pageSize.value = val
  fetchStudents()
}

const handleCurrentChange = (val) => {
  currentPage.value = val
  fetchStudents()
}

// 处理编辑
const handleEdit = (row) => {
  isEdit.value = true
  dialogTitle.value = '编辑学生信息'
  dialogVisible.value = true
  studentForm.value = { ...row }
}

// 处理删除
const handleDelete = (row) => {
  ElMessageBox.confirm(
    `确定要删除学生 ${row.name} 吗？`,
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(async () => {
    try {
      const response = await deleteStudent(row)
      if (response.code === 200) {
        ElMessage.success('删除成功')
        fetchStudents() // 重新加载数据
      } else {
        ElMessage.error(response.message || '删除失败')
      }
    } catch (error) {
      console.error('删除学生失败：', error)
      ElMessage.error('删除失败')
    }
  }).catch(() => {
    ElMessage.info('已取消删除')
  })
}

// 提交表单
const submitForm = async () => {
  if (!studentFormRef.value) return
  
  await studentFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        console.log("studentForm---------->"+studentForm.value)
        const response = await updateStudent(studentForm.value)
        if (response.code === 200) {
          ElMessage.success('保存成功')
          dialogVisible.value = false
          fetchStudents() // 重新加载数据
        } else {
          ElMessage.error(response.message || '保存失败')
        }
      } catch (error) {
        console.error('保存学生信息失败：', error)
        ElMessage.error('保存失败')
      }
    }
  })
}

// 处理对话框关闭
const handleClose = (done) => {
  studentFormRef.value?.resetFields()
  done()
}

onMounted(() => {
  fetchStudents()
})
</script>

<style scoped>
.student-list {
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