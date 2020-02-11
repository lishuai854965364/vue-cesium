import {
  get,post
} from './index'
export const InitDataUrl1 = (params) => post('api/config/params', params)
// 获取运营单位及电压等级
export const getOperatorData = (params) => get('api/lines/buildTree', params)
// 根据电压等级获取线路
// export const getlineData = (parmas) => post('api/lines/findByYwdwAndDydj', parmas)
// 获取图层目录树
export const getCoverageTreeData = (parmas) => get('api/config/layertree', parmas)
//添加线路点云
export const Lodecloudpoint = (parmas) => get('api/chunk/query/extent',parmas)
//杆塔标签开始
export const PolesLables = (parmas) => get('api/poles/extent',parmas)


// 获取线路
export const getlineData = (parmas) => get('api/lines/linename', parmas)
// 根据线路获取杆塔
export const getTowerData = (parmas) => get('api/poles/findByXlid', parmas)


