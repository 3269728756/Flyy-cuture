import React,{useEffect} from 'react'
import {
    Form,
    Input,
    Select,
} from 'antd';


export default function AddFrom(props) {
  // 取出从父组件中传递过来的数据
  const {categorys, parentId}=props;
  // 创造Form对象
  const [form] = Form.useForm();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(()=>{
     props.setForm(form)
  })
  
  return (
    <Form form={form}>
    <Form.Item  name="id" initialValue={parentId}>
      <Select  key={parentId}>
        <Select.Option value="0">一级分类</Select.Option>
        
        {
            categorys.map(add=> <Select.Option key={add._id} value={add._id}>{add.name}</Select.Option>)
        }
      </Select>
    </Form.Item >
    <Form.Item  name="addValue">
      <Input placeholder='请输入分类名称' className='add'/>
    </Form.Item>
  </Form>
  )
}
