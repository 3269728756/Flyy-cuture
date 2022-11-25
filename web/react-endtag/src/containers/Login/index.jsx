import 'antd/dist/antd.less';
import  './css/login.less'
import memory from "../../utils/memory"
import logo from "../../access/images/logo192.png"
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button,  Form, Input, message} from 'antd';
import React from 'react';
import {useNavigate,Navigate} from "react-router-dom";
import {reqLogin} from "../../Api/index"
import store from "../../utils/storge"



 export default function Login() {
   
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // 引入useNavigate()钩子以便创建路由跳转
    const navigate=useNavigate()
    // 创建用于登陆的函数（form表单中的函数，用于提交表单且数据验证成功后的回调事件）
    const onFinish =async(values) => {
      // 数据收集
          const {username,password}=values
        // 将收集到的数据传递到requLogin接口（利用async和await是实现接口请求的同步发送）
          const result=await reqLogin(username,password)
      //  登陆成功的判断以及成功后的数据保存和路由跳转
          if(result.status===0){
          message.success("登陆成功")
          const user=result.data
          // 用于将用户数据保存到浏览器
          store.saveUser(user)
          memory.user=user
          // 进行路由跳转到Admin界面
          navigate(-1)
         }else{
          message.error(result.msg)
        }
       };
    //  从内存中取出用户数据来做判断
    const user=memory.user
    // 如果用户数据已保存到内存，则跳转到Admin组件
    if(user&&user._id){
      return  <Navigate to="/"/>
    }
    
  return (
   
   <div className='Login'>
    <header className='Login-header'>
        <img src={logo} alt="logo" />
        <h1>飞佑文化: 后台管理系统</h1>
    </header>
    <section className='Login-select'>
        <h2>用户登陆</h2>
        
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        // 根据内置属性进行数据验证
        rules={[
          {
            required: true,
            message: '请输入用户名!',
           },
          {
            min:4,message:"用户名必须大于4位",
          },
          {
            max:12,message:"用户名必须小于12位"
          },{
            pattern:/^[0-9A-z]*$/,message:"用户名不合法，请重新输入"
          },
          
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
            {
                required: true,
              
                message: '请输入密码!',
               
              },
              {
                min:4,message:"密码必须大于4位",
              },
              {
                max:8,message:"密码必须小于8位"
              },{
               
                pattern:/^[0-9A-z]*$/,message:"密码不合法，请重新输入"
              },
              
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="密码"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登录
        </Button>
       
      </Form.Item>
    </Form>
    </section>

  </div>
  )
}


