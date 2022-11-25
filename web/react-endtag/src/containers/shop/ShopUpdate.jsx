import React,{useState,useEffect,useRef} from 'react'
import { useNavigate,useParams} from "react-router-dom"
import { Card,Button, Form, Input,InputNumber,Cascader, message } from 'antd';
import {ArrowLeftOutlined} from "@ant-design/icons"
import RichText  from "./richText"
import {reqCatgory,reqAddOrUpdateProduct} from "../../Api/index"
import PictuerWall from "./pictureWall"

// 设置元素的行列分布
const layout = {
  labelCol: {span: 2},
  wrapperCol: {span: 10,},
};


 export default function ShopUpdate(props){
  // 用于跳转路由的函数
  const naviagte = useNavigate()
  // 用于接收路由传参
  let params = useParams();
  // 用于创建form对象
  const formEl = useRef();
  // 接收父组件传来的数据
  let product=JSON.parse(localStorage.getItem('parss')).item
  const [options, setOptions] = useState([]);//
  const [value, setValue] = useState([]);//富文本编辑器的内容
  const {categoryId,pCategoryId}=product
  const categoryIds=[]

  // 将获得的一级分类列表部署到页面
  const initOptions=async (categorys)=>{
    // 遍历一级分类列表
  const options=categorys.map(cn=>({
      value: cn._id,
      label: cn.name,
      isLeaf: false,
    }))
    // 二级分类商品更新
    if(params.id&&pCategoryId!=="0"){
      let subCateys= await getCategorys(pCategoryId)
      // 遍历二级分类列表
      const childOptions=subCateys.map(cn=>({
        value: cn._id,
        label: cn.name,
        isLeaf: true,
      }))
      const targetOptions=options.find(option=>option.value===pCategoryId)
      targetOptions.children=childOptions
    }

    // 更新状态
    setOptions(options)
  }
  // 向服务器发送请求，获得一级分类列表
  let getCategorys=async (parentId)=>{
  const result=await reqCatgory(parentId)
  // 拿到一级分类列表
  const categorys=result.data
    // 判断请求是否成功发送
    if(result.status===0){
      // 判断是否为一级分类列表
      if(parentId==="0"){
        // 将一级分类列表传进该函数
       initOptions(categorys)
      }
     else{
      // 将二级分类列表作为async的成功返回
        return categorys
     }}}
 
  useEffect(()=>{
    getCategorys("0")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  const loadData =async (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    // 加载中
    targetOption.loading = true;
    // 获取二级分类列表
    const subCate=await getCategorys(targetOption.value)
    // 完成加载
    targetOption.loading = false;
    // 遍历二级分类列表
    if(subCate&&subCate.length>0){
      const options=subCate.map(cn=>({
        value: cn._id,
        label: cn.name,
        isLeaf: true,
      }))
      // 将二级分类列表部署到一级分类列表中
      targetOption.children=options
    }else{
      targetOption.isLeaf=true
    }
    // 更新二级分类列表状态
    setOptions([...options]);
  
  }
  // 获取富文本编辑器的内容
  const onChange = (editor) => {
    const value=(editor.getHtml())
    // 将内容更新到状态中
    setValue({value})
    }

  let age=params.id?product:{}
  const {detail}=product
  // 获取图片
  const imgs=age.imgs
  
 const submit=async ()=>{
  // 接收表单的各种数据
    const data=formEl.current.getFieldsValue()
    const {name,desc,price,categoryIds}=data
    // 从接收到的数据中拿到图片数组
    const imgss=data.imgs
    const imgs= imgss?imgss.fileList.map(file => file.name):age.imgs
    let  pCategoryId, categoryId;
    // 判断为一级分类还是二级分类
    if(categoryIds.length===1){
      pCategoryId="0"
      categoryId=categoryIds[0]
    }else{
      pCategoryId=categoryIds[0]
      categoryId=categoryIds[1]
    }
    const detail=value.value
    // 将所有表单的数据封装到product中
    const product={name,desc,price,imgs,detail,pCategoryId,categoryId}
    // 判断是否为更新商品
    if(params.id){
      product._id=params.id
    }
    const result=await reqAddOrUpdateProduct(product)
    if(result.status===0){
      message.success("操作商品成功")
      // 返回商品界面
      naviagte(-1)
    }else{
      message.error("操作商品失败")
    }
  }
  
  // 判断是否为更新商品界面
if(params.id){
  // 展示一级分类
  if(pCategoryId==="0"){
    categoryIds.push(categoryId)
  }else{
    // 展示一级分类和二级分类
  categoryIds.push(pCategoryId)
  categoryIds.push(categoryId)
  }
}
  return (
    <Card
    title={
       <Button  style={{fontSize:"18px"}} 
        type="link"
        onClick={()=>{naviagte(-1)}}>
          <ArrowLeftOutlined  />{params.id?"修改":"添加"}商品</Button>
        }>
      <Form {...layout} ref={formEl}  className="form" >
      <Form.Item
        name="name"
        label="商品名称"
        initialValue={age.name}
        className="item"
        validateTrigger="onBlur"
        rules={[
          {
            required: true,
            min:1,
            message:"商品名称不能为空"
          }
        ]}>
        <Input placeholder="请输入商品名称"/>
      </Form.Item>
      <Form.Item name="desc" label="商品描述"
       initialValue={age.desc}
        className="item"
      validateTrigger="onBlur"
       rules={[
        {
          required: true,
          min:1,
          message: '商品描述不能为空',
        },
      ]}
      >
        <Input.TextArea  placeholder="请输入商品描述" autoSize={{ minRows: 2, maxRows: 6 }}/>
      </Form.Item>
      <Form.Item
        name="price"
        label="商品价格"
        validateTrigger="onBlur"
        initialValue={age.price}
        rules={[
          {
            required: true,
            message:"",
          },
        () =>({
          validator(rule,value){
          if(/\d/.test(value)&&value>0){
          return Promise.resolve();
          }else{
          return Promise.reject("请正确输入价格");}
          }})
        ]}>
        <InputNumber
          addonAfter="元"
          style={{
            width: '100%',
          }}
          placeholder="请输入商品价格"
        />
      </Form.Item>
      <Form.Item
        name="categoryIds"
        validateTrigger="onBlur"
        label="商品分类"
        initialValue={categoryIds||{}}
        className="item"
        rules={[
          {
            required: true,
          },
        ]}
      >
       <Cascader options={options} loadData={loadData}  changeOnSelect />
      </Form.Item>
            <PictuerWall imgs={imgs} params={params}/>
            <RichText click={onChange} detail={detail} params={params} imgs={imgs}/>
      <Form.Item>
            <Button type='primary'  onClick={submit}>提交</Button>
      </Form.Item>
     
    </Form>
    </Card>
  )
}


