import React, { Component } from 'react'
import { Card,Button,Table,Modal,message} from 'antd';
import LinkButton from '../../Components/linkButton/LinkButton';
import {PlusOutlined,ArrowRightOutlined } from "@ant-design/icons"
import { reqCatgory,reqUdCatgory ,reqAddCatgory} from '../../Api/index'
import AddFrom from './addFrom';
import UdFrom from './UdFrom';

export default class Category extends Component {
  
    state={
            loading:true,
            categorys: [], // 一级分类列表
            subCategorys: [], // 二级分类列表
            parentId:"0", // 当前需要显示的分类列表的父分类ID
            parentName: '', // 当前需要显示的分类列表的父分类名称
            showState:0,
          }
// 点击确认的触发函数
  addhandleOk = async () => {
    // 隐藏Modal框
    this.setState({showState:0,});
    // 从输入中得到categoryName
   const categoryName=this.form.getFieldValue().addValue
  //  得到parentId
   const parentId=this.form.getFieldValue().id
    const result= await reqAddCatgory( parentId,categoryName)
    console.log(result)
    if (result.status===0) {
      message.success("添加分类成功")
        // 重新渲染页面
        this.getCategorys()
        }else{
          message.error("添加分类失败")
        }
    };



  showUpdate=(category)=>{
    this.category=category
    this.setState({showState:2});
   }

  updhandleOk =async () => {
    // 关闭修改框
    this.setState({showState:0});
    // 准备数据
    const categoryId = this.category._id
    const categoryName=this.form.getFieldValue().updValue
    if(categoryName!==""){
        const result= await reqUdCatgory({categoryId, categoryName})
        if (result.status===0) {
        // 重新渲染页面
        this.getCategorys()
        }
    }else{
        message.error("分类名称必须输入")
    }
  }
  
 // 一级路由的呈现
  getCategorys=async (parentId)=>{
        parentId = parentId || this.state.parentId
        const result=await reqCatgory(parentId)
        this.setState({loading:false})
        if(result.status===0){
            const categorys=result.data
            if(parentId==="0"){
                this.setState({
                    categorys
                })
            }else{
                this.setState({
                subCategorys:categorys
                 })
            }
        }
    }
    // 二级路由的呈现
    showCategory=(category)=>{
        this.setState({
            parentId:category._id,
            parentName:category.name
        },()=>{
          // 调用一级路由
            this.getCategorys()
        })

    }
    showsCategory=()=>{
        this.setState({
            parentId:"0",
            parentName:"",
            subCategorys:[],
        })
    }
    // 在页面加载时呈现
    componentDidMount(){
        this.getCategorys()
    }
   
  render() {
  
    // 从状态中取出这些数据
    const {parentId,categorys,subCategorys,loading,parentName,showState}=this.state
    const category=this.category ||{}
    const title=parentId==="0"?"一级分类列表":(
        <span>
            <LinkButton onClick={this.showsCategory}>一级分类列表</LinkButton>
            <ArrowRightOutlined />
            <span style={{padding:" 0 10px ",}}>{parentName}</span>
        </span>
            )
    const add=(<Button type="primary" onClick={()=>this.setState({showState: 1})}>
               <PlusOutlined/>
               添加
             </Button>)
    const columns = [
            {
              title: '分类的名称',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '操作',
              width:300,
       
                   render:(category)=>(
                       <span>
                         <LinkButton   onClick={()=>this.showUpdate(category)}>修改分类</LinkButton>
                         {this.state.parentId==="0"?<LinkButton onClick={()=>{this.showCategory(category)}}>查看子分类</LinkButton>:null}
                       </span>
                     ),
              key: 'age',
            },
        ];


    return (
  <Card title={title} extra={add}>
     <Table 
     dataSource={parentId==="0"?categorys:subCategorys}
      columns={columns} 
      loading={loading}
      pagination={{defaultPageSize:5,showQuickJumper:true,}}
      rowKey="_id"
      bordered
      />
     <Modal  title="添加分类" open={showState===1} 
      onOk={this.addhandleOk} 
      onCancel={()=>this.setState({showState:0})}
       destroyOnClose>
        <AddFrom 
         setForm={(form)=>{this.form=form}}
         categorys={categorys}
         parentId={parentId}
        />
      </Modal>
      
     <Modal title="更新分类" open={showState===2} 
     onOk={this.updhandleOk} 
     onCancel={()=>this.setState({showState:0})}
     destroyOnClose>
        <UdFrom categoryName={category.name}
        setForm={(form)=>{this.form=form}}
        />
      </Modal>

  </Card>
      
    )
  }
}
