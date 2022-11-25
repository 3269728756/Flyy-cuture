import React, { useEffect} from 'react'
import {Form,Input} from 'antd';


export default function UdFrom(props) {
// 取出从父组件中引入的数据
  const {categoryName}=props
  // 创造form对象
  const [form] = Form.useForm();
  useEffect(()=>{
   props.setForm(form)
  })
  return (
    <Form form={form}>
      <Form.Item name="updValue"  initialValue={categoryName}>
        <Input placeholder='请输入分类名称'  
             className="data"  
              key={categoryName} />
      </Form.Item>
  </Form>
  )
}
