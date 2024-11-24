<template>
  <div class="teacher-list">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <h2>教师管理</h2>
          <div class="header-actions">
            <el-button type="primary" :icon="Plus">添加教师</el-button>
            <el-input
              v-model="searchValue"
              placeholder="搜索教师..."
              class="search-input"
              :prefix-icon="Search"
            />
          </div>
        </div>
      </template>
      
      <el-table 
        :data="teacherList" 
        border 
        style="width: 100%"
        :max-height="tableHeight"
        highlight-current-row>
        <el-table-column prop="no" label="工号" width="120" />
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="sex" label="性别" width="80" />
        <el-table-column prop="phone" label="电话" width="150" />
        <el-table-column prop="birthdayStr" label="生日" width="120" />
        <el-table-column prop="position" label="职称" width="120" />
        <el-table-column prop="collegeName" label="所属学院" min-width="200" />
        <el-table-column label="院长身份" width="100">
          <template #default="scope">
            {{ scope.row.isCollegeLeader === 1 ? '是' : '否' }}
          </template>
        </el-table-column>
        <el-table-column label="部长身份" width="100">
          <template #default="scope">
            {{ scope.row.isDepartmentLeader === 1 ? '是' : '否' }}
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
        ref="teacherFormRef"
        :model="teacherForm"
        :rules="rules"
        label-width="100px">
        <el-form-item label="工号" prop="no">
          <el-input v-model="teacherForm.no" :disabled="isEdit"/>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="teacherForm.name"/>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="teacherForm.sex">
            <el-option label="男" value="男"/>
            <el-option label="女" value="女"/>
          </el-select>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="teacherForm.phone"/>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-date-picker
            v-model="teacherForm.birthday"
            type="date"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="职称" prop="position">
          <el-select v-model="teacherForm.position">
            <el-option label="助教" value="助教"/>
            <el-option label="讲师" value="讲师"/>
            <el-option label="副教授" value="副教授"/>
            <el-option label="教授" value="教授"/>
          </el-select>
        </el-form-item>
        <el-form-item label="所属学院" prop="collegeName">
          <el-input v-model="teacherForm.collegeName"/>
        </el-form-item>
        <el-form-item label="院长身份" prop="isCollegeLeader">
          <el-switch
            v-model="teacherForm.isCollegeLeader"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
        <el-form-item label="部长身份" prop="isDepartmentLeader">
          <el-switch
            v-model="teacherForm.isDepartmentLeader"
            :active-value="1"
            :inactive-value="0"
          />
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
import { getAllTeacher, deleteTeacher, updateTeacher } from '@/apis/teacher'
import { Plus, Search, Edit, Delete } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const teacherList = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const searchValue = ref('')

const dialogVisible = ref(false)
const dialogTitle = ref('')
const isEdit = ref(false)
const teacherFormRef = ref(null)

const teacherForm = ref({
  id: '',
  no: '',
  name: '',
  sex: '',
  phone: '',
  birthday: '',
  position: '',
  isCollegeLeader: 0,
  collegeId: '',
  collegeName: '',
  isDepartmentLeader: 0,
  departmentId: '',
  password: ''
})

const rules = {
  no: [{ required: true, message: '请输入工号', trigger: 'blur' }],
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
  phone: [{ required: true, message: '请输入电话', trigger: 'blur' }],
  position: [{ required: true, message: '请选择职称', trigger: 'change' }],
  collegeName: [{ required: true, message: '请输入所属学院', trigger: 'blur' }]
}

const tableHeight = computed(() => {
  return window.innerHeight - 280
})

const fetchTeachers = async () => {
  try {
    const response = await getAllTeacher(
      currentPage.value,
      pageSize.value,
      '',
      ''
    )
    if (response.code === 200) {
      teacherList.value = response.data.rows
      total.value = response.data.records
    }
  } catch (error) {
    console.error('获取教师列表失败：', error)
  }
}

const handleSizeChange = (val) => {
  pageSize.value = val
  fetchTeachers()
}

const handleCurrentChange = (val) => {
  currentPage.value = val
  fetchTeachers()
}

const handleEdit = (row) => {
  isEdit.value = true
  dialogTitle.value = '编辑教师信息'
  dialogVisible.value = true
  teacherForm.value = { ...row }
}

const handleDelete = (row) => {
  ElMessageBox.confirm(
    `确定要删除教师 ${row.name} 吗？`,
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(async () => {
    try {
      const response = await deleteTeacher(row)
      if (response.code === 200) {
        ElMessage.success('删除成功')
        fetchTeachers()
      } else {
        ElMessage.error(response.message || '删除失败')
      }
    } catch (error) {
      console.error('删除教师失败：', error)
      ElMessage.error('删除失败')
    }
  }).catch(() => {
    ElMessage.info('已取消删除')
  })
}

const submitForm = async () => {
  if (!teacherFormRef.value) return
  
  await teacherFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        const response = await updateTeacher(teacherForm.value)
        if (response.code === 200) {
          ElMessage.success('保存成功')
          dialogVisible.value = false
          fetchTeachers()
        } else {
          ElMessage.error(response.message || '保存失败')
        }
      } catch (error) {
        console.error('保存教师信息失败：', error)
        ElMessage.error('保存失败')
      }
    }
  })
}

const handleClose = (done) => {
  teacherFormRef.value?.resetFields()
  done()
}

onMounted(() => {
  fetchTeachers()
})
</script>

<style scoped>
.teacher-list {
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