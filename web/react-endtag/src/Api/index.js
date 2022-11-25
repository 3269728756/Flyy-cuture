// 根据接口文档定义包含应用中所有接口请求的模块
import ajax from "./ajax"
import {message} from "antd"
import jsonp from "jsonp"
const Base="/api"
export const reqLogin=(username,password)=>ajax(Base + "/Login",{username,password},"POST")
// 定义获取分类的接口
export const reqCatgory=(parentId)=>ajax(Base + "/manage/category/list",{parentId})
// 定义添加分类的
export const reqAddCatgory=(parentId,categoryName)=>ajax(Base + "/manage/category/add",{parentId,categoryName},"POST")
// 定义更新分类的
export const reqUdCatgory=({categoryId,categoryName})=>ajax(Base + "/manage/category/update",{categoryId,categoryName},"POST")
// export const reqAdduser=(user)=>ajax("manage/user/add",user,"POST")
// 获取商品分页列表
export const reqProducts = (pageNum, pageSize) => ajax(Base + '/manage/product/list', {pageNum, pageSize})
// 更新商品的状态(上架/下架)
export const reqUpdateStatus = (productId, status) => ajax(Base + '/manage/product/updateStatus', {productId, status}, 'POST')
/*
搜索商品分页列表 (根据商品名称/商品描述)
searchType: 搜索的类型, productName/productDesc
 */
export const reqSearchProducts = (pageNum, pageSize, searchType,keyWord) => ajax(Base+ '/manage/product/search', {
    pageNum,
    pageSize,
    [searchType]: keyWord,
  })
// 获取一个分类
export const reqCategory = (categoryId) => ajax(Base + '/manage/category/info', {categoryId})
// 获取所有用户的列表
export const reqUsers = () => ajax(Base + '/manage/user/list')
// 删除指定用户
export const reqDeleteUser = (userId) => ajax(Base + '/manage/user/delete', {userId}, 'POST')
// 获取所有角色的列表
export const reqRoles = () => ajax(Base + '/manage/role/list')
// 添加角色
export const reqAddRole = (roleName) => ajax(Base + '/manage/role/add', {roleName}, 'POST')
// 添加角色
export const reqUpdateRole = (role) => ajax(Base + '/manage/role/update', role, 'POST')
// 添加/更新用户
export const reqAddOrUpdateUser = (user) => ajax(Base + '/manage/user/'+(user._id?"update":"add"), user, 'POST')
// 添加图片
export const reqAddImg = (image) => ajax(Base + '/manage/img/upload', {image}, 'POST')
// 删除指定名称的图片
export const reqDeleteImg = (name) => ajax(Base + '/manage/img/delete', {name}, 'POST')
// 添加/修改商品
export const reqAddOrUpdateProduct = (product) => ajax(Base + '/manage/product/' + ( product._id?'update':'add'), product, 'POST')
// 请求天气
export  const reqWeather=(cityCode)=>{
  window._AMapSecurityConfig = {
    serviceHost:'http://localhost:8888/_AMapService',  
    // 例如 ：serviceHost:'http://1.1.1.1:80/_AMapService',
}
  return new Promise((resolve,reject)=>{
    const url=`https://restapi.amap.com/v3/weather/weatherInfo?key=7f6bb4f4349b569abf33bbb7e72ad5c6&city=${cityCode}`
  jsonp(url,{},(err,data)=>{
    if(data.status==="1"){
      const {weather,temperature,province,city} = data.lives[0]
     resolve({weather,temperature,province,city})
    }else{
      message.error("获取天气信息失败")
    }
  })
  })
}
  