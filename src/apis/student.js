import http from '../utils/http'
// 登录
export const UserLogin = loginValue => {
  const params = new URLSearchParams()
  for (let key in loginValue) {
    params.append(key, loginValue[key])
  }
  console.log(loginValue)
  return http.post('/report/login', params)
}

// 查询所有学生
export const getAllStudent = (param1, param2, param3, param4) => {
  return http.get('/student/all', {
    params: {
      page: param1,
      rows: param2,
      searchField: param3,
      searchString: param4
    }
  })
}

// 编辑删除学生
export const editDeleteStudent = (student, action) => {
  const params = new URLSearchParams()
  for (let key in student) {
    if (student[key] !== null && student[key] !== undefined) {
      params.append(key, student[key])
    }
  }
  params.append('action', action)
  return http.put('/editStudent', params)
}

// 删除学生
export const deleteStudent = (student) => {
  return http.put('/student/delete', {
    ...student
  })
}

// 编辑学生
export const updateStudent = (student) => {
  return http.post('/student/edit', {
    ...student
  })
}
