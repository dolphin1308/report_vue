import http from '../utils/http'

// 查询全部学院
export const getAllCollege = (param1, param2) => {
    return http.get('/college/all', {
      params: {
        page: param1,
        rows: param2
      }
    })
  }

// 删除学院
export const deleteCollege = (college) => {
  return http.put('/college/delete', {
    ...college
  })
}

// 编辑学院
export const updateCollege = (college) => {
  return http.post('/college/edit', {
    ...college
  })
}
