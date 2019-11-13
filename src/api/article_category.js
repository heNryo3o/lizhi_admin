import request from '@/utils/request'

let model = '/article-category'   //指定模块名称,快速生成增删改查接口名

export function getList(data) {
  return request({
    url: model+'/index',
    method: 'get',
    params: data
  })
}

export function getSubCategory(data) {
  return request({
    url: model+'/sub-options',
    method: 'get',
    params: data
  })
}

export function edit(data) {
  return request({
    url: model+'/edit',
    method: 'post',
    data
  })
}

export function create(data) {
  return request({
    url: model+'/create',
    method: 'post',
    data
  })
}

export function changeStatus(data) {
  return request({
    url: model+'/change-status',
    method: 'post',
    data
  })
}

export function getParentOptions(data) {
  return request({
    url: model+'/parent-options',
    method: 'get',
  })
}

export function categoryOptions(data) {
  return request({
    url: model+'/category-options',
    method: 'get',
    params: data
  })
}
