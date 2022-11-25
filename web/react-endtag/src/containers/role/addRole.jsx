import React, { useEffect,useState} from 'react'
import {Form,Input, } from 'antd';

const Item=Form.Item
export default function AddRole(props) {
const [state,setState]=useState("")
  // 创建form对象
  const [form] = Form.useForm();
// 输入框动态得到用户的名字
  const saveUsername=(event)=>{
   setState({state:event.target.value})
  }
    props.setForm(state)
  useEffect(()=>{
   props.setForm(form)
   })
  
  return (
    <Form form={form}>
         
    <Item label="角色名称"name="sname"
     rules={[
        {
          required: true,
          min:1,
          message:"角色名称不能为空"
        },
      ]}
      categoryname="categoryName" >
 
    <Input placeholder='请输入角色名称' style={{width:"80%"}}
    onChange={saveUsername}  className="data"  />
  </Item>
   </Form>
  )
}
