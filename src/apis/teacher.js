import http from '../utils/http'

// 查询全部教师
export const getAllTeacher = (param1, param2, param3, param4) => {
  return http.get('/teacher/all', {
    params: {
      page: param1,
      rows: param2,
      searchField: param3,
      searchString: param4,
    },
  })
}

// 删除教师
export const deleteTeacher = teacher => {
  return http.put('/teacher/delete', {
    ...teacher,
  })
}

// 编辑教师
export const updateTeacher = teacher => {
  return http.post('/teacher/edit', {
    ...teacher,
  })
}

// 获取教师自己的报告
export const getTeacherReport = () => {
  return http.get('/my-report')
}

// 获取教师的历史会议
export const getTeacherHistoryMeeting = () => {
  return http.get('/pass-meetings')
}

// 获取教师的消息中心
export const getTeacherMessageCenter = () => {
  return http.get('/messages')
}
