import React, { useEffect} from 'react'
import {Select,Form,Input, } from 'antd';

const Item=Form.Item
// 设置行与列的长度
const layout = {
  labelCol: {span: 6,},
  wrapperCol: {span: 15},
};
const Option=Select.Option
export default function UserForm(props) {
  // 创建form对象
  const [form] = Form.useForm();
  // 从props读取父组件传过来的数据
  const {roles}=props
  const user=props.user||{}
   useEffect(()=>{
    props.setForm(form)
  })
 
  
  return (
    <Form form={form} {...layout}  >
         
    <Form.Item label="用户名"name="username" initialValue={user.username}
    rules={[
        {
          required: true,
          min:4,
          message:"角色名称不能小于四位"
        },
      ]}
      >
    <Input placeholder='请输入角色名称' 
     />
  </Form.Item>
  {
    user._id?null:
    (<Item 
    label="密码"
    name="password"
     rules={[
        {
          required: true,
          min:4,
          message:"密码不能小于四位"
        },
      ]}
     
       >
 
    <Input placeholder='请输入密码' type="password"/>
  </Item>)
  }
  
  <Item label="手机号码"name="phone"
     rules={[
        {
          required: true,
        },
        () =>({
          validator(rule,value){
            const rul=/^[1][3,4,5,6,7,8,9][0-9]{9}$/
          if(rul.test(value)){
          return Promise.resolve();
          }else{
          return Promise.reject("请正确输入手机号码格式");
        }
          }})
      ]}
      initialValue={user.phone}
       >
 
    <Input placeholder='请输入手机号码'/>
  </Item>
  <Item label="邮箱"name="email"rules={[
        {
          required: true,
        },
        () =>({
          validator(rule,value){
            const rul= /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
          if(rul.test(value)){
          return Promise.resolve();
          }else{
          return Promise.reject("请正确输入邮箱格式");
        }
          }})
      ]}
      initialValue={user.email}
       >
    <Input placeholder='请输入邮箱地址'/>
  </Item>
  <Item label="角色" name="role_id"
 rules={[
     {
       required: true,
       min:4,
       message:"角色名称不能小于四位"
     },
   ]}
   initialValue={user.role_id}
  >
    <Select >
      {roles.map((role)=><Option key={role._id}  >{role.name}</Option>)}
      </Select>
    </Item>
   </Form>
  )
}
