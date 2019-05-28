import axios from '@/libs/api.request'

export const TableData = parmas => { //用户手机注册
  return axios.request({
    url: parmas,
    method: 'GET'
  })
}
