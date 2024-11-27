import http from '../utils/http'

// 查询全部部门
export const getAllDepartment = (param1, param2, param3, param4) => {
  return http.get('/department/all', {
    params: {
      page: param1,
      rows: param2,
      searchField: param3,
      searchString: param4,
    },
  })
}

// 删除部门
export const deleteDepartment = department => {
  return http.put('/department/delete', {
    ...department,
  })
}

// 编辑部门
export const updateDepartment = department => {
  return http.post('/department/edit', {
    ...department,
  })
}

/**
 * AAO
 */

// 查询已通过的审核
export const getPassedAAOReport = () => {
  return http.get('/pass')
}

/**
 * 宣传部
 */

// 查看等待排期的报告
export const getWaitingReport = () => {
  return http.get('/wait-arrange')
}

// 查看开放预约的报告
export const getOpenReport = () => {
  return http.get('/appointing')
}

// 查看即将开始的报告
export const getStartingReport = () => {
  return http.get('/prepare-meeting')
}
