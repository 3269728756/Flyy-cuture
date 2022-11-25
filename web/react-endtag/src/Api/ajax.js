// 能发送异步ajax请求的函数模块
// 优化：统一处理请求异常

import { message } from "antd"
import axios from "axios"
export default function ajax(url,data={},type="GET"){
    return new Promise((resolve,reject)=>{
        let promise
        if(type==="GET"){
            // 发送get请求
           promise=axios.get(url,{
                // 设置参数
                params:data
            })
        }else{
            // 发送post请求
           promise=axios.post(url,data)
    
        }
        promise.then((response)=>{
            resolve(response.data)
        }).catch((error)=>{
            message.error("请求异常："+error.message)

        })
    })
    
   


}