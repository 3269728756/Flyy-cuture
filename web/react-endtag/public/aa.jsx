
// import { Button, Card,Table } from 'antd';
// import {PlusOutlined,ArrowRightOutlined } from "@ant-design/icons"
// import LinkButton from "../../Components/linkButton/LinkButton"
//  import  {reqCatgory} from "../../Api/index"
// import React, { Component } from 'react'

// export default class Category extends Component {
//   state={
//     loading:true,
//     categorys: [], // 一级分类列表
//     subCategorys: [], // 二级分类列表
//     parentId:"0", // 当前需要显示的分类列表的父分类ID
//     parentName: '', // 当前需要显示的分类列表的父分类名称
    
//   }
 
//   getCategory=async (parentId)=>{
//     // const {parentId}=this.state
//     parentId = parentId || this.state.parentId
//     const result =await reqCatgory(parentId)
//     this.setState({loading:false})
//     if(result.status===0){
//       const categorys=result.data
//       if(parentId==="0"){
//         this.setState({
//           categorys
//         })
//       }else{
//         this.setState({
//           subCategorys:categorys
//         })
//       }
      
//     }
//   }
//   showCategory=(category)=>{
//     this.setState({
//       parentId:category._id,
//       parentName:category.name
//     },()=>{
//       console.log(this.state.parentId)
//       this.getCategory()

//     })
  

//   }
//   componentDidMount(){
//     this.getCategory()
//   }
  
//   render() {
//     const {categorys,loading,subCategorys,parentId,parentName}=this.state
//    const title=parentId==="0"?"一级分类列表":(<span>
//       <LinkButton onClick={this.showCategory}>一级分类列表</LinkButton>
//       <ArrowRightOutlined />
//       <span style={{padding:" 0 10px ",}}>{parentName}</span>
//    </span>)
//    const add=(
//      <Button type="primary">
//        <PlusOutlined/>
//        添加
//      </Button>
//    )
   
  
  
//    const columns = [
//      {
//        title:"一级分类列表",
//        dataIndex: 'name',
      
//        key: 'name',
//      },
//      {
//        title: '操作',
//        width:300,
       
//        render:(category)=>(
//          <span>
//            <LinkButton>修改分类</LinkButton>
//            {this.state.parentId==='0' ? <LinkButton onClick={() => this.showCategory(category)}>查看子分类</LinkButton> : null}
//          </span>
//        ),
//        // key: 'age',
//      },
     
//    ];
//     return (
//       <div>
//       <Card
//     width={"500"}
//      title={title}
//      // eslint-disable-next-line jsx-a11y/anchor-is-valid
//      extra={add}
    
//    >
//     <Table 
//     dataSource={parentId==='0' ? categorys : subCategorys}
//      columns={columns} 
//      rowKey="_id"
//      loading={loading}
//      pagination={{defaultPageSize:5,showQuickJumper:true,}}
     
//      bordered/>;
//    </Card>
//    </div>
//     )
//   }
// }

// // export default function Category() {
// //   const title="一级分类列表"
// //   const add=(
// //     <Button type="primary">
// //       <PlusOutlined/>
// //       添加
// //     </Button>
// //   )
  
 
  
// //   const columns = [
// //     {
// //       title: '分类的名称',
// //       dataIndex: 'name',
     
// //       key: 'name',
// //     },
// //     {
// //       title: '操作',
// //       width:300,
      
// //       render:()=>(
// //         <span>
// //           <LinkButton>修改分类</LinkButton>
// //           <LinkButton>查看子分类</LinkButton>
// //         </span>
// //       ),
// //       // key: 'age',
// //     },
    
// //   ];
// //   return (
// //     <div>
// //        <Card
// //       title={title}
// //       // eslint-disable-next-line jsx-a11y/anchor-is-valid
// //       extra={add}
     
// //     >
// //      <Table 
// //     //  dataSource={}
// //       columns={columns} 
// //       bordered/>;
// //     </Card>
// //     </div>
// //   )
// // }
