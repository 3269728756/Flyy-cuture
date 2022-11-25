import React, { Component } from 'react'
import { Card,Button,Table ,Modal} from 'antd';
import {reqUsers,reqDeleteUser,reqAddOrUpdateUser} from "../../Api/index"
import LinkButton from '../../Components/linkButton/LinkButton';
import UserForm from "../user/useForm"
import dates from "../../utils/Date"
export default class User extends Component {
  state={
    isShow:false,
    users:[],
    roles:[],
     }

  initRoleName=(roles)=>{
    // 将所有的角色信息遍历
    const roleName=roles.reduce((pre,role)=>{

      pre[role._id]=role.name
      return pre
    },{})
    this.roleName=roleName
    
  }
  // 获取所有用户列表
  getUsers=async()=>{
    const result=await reqUsers()
    if(result.status===0){
      // 得到所有用户与所有角色
      const {users,roles}=result.data
      // 将其更新到状态中
      this.setState({users ,roles})
      // 初始化角色列表
      this.initRoleName(roles)
    }
  }
  // 删除用户
  deleteUser=(user)=>{
    Modal.confirm({
      title: `确认删除${user.username}用户吗？`,
      okText: 'ok',
      cancelText: 'cancel',
      onOk:async()=> {
        // 拉去删除用户的接口
        const result=await reqDeleteUser(user._id)
       if(result.status===0){
        this.getUsers()
       }
      }
    })
  }
  showModal = () => {
    this.user=null
    this.setState({isShow:true})
  };
  showUpdate=(user)=>{
    this.user=user
    this.setState({isShow:true})
  }
  handleOk = async() => {
    // 从表单输入中动态获取user
    const user=this.form.getFieldValue()
    this.form.resetFields()
    if(this.user){
      user._id=this.user._id
    }
    const result=await reqAddOrUpdateUser(user)
    if(result.status===0){
      this.getUsers()
    }
    this.setState({isShow:false})
  };
  
  componentDidMount(){
    this.getUsers()
  }
  render() {
    const {isShow,users,roles}=this.state
    const title= <Button type="primary" onClick={this.showModal}>创建用户</Button>
    const user=this.user
    const columns = [
      {
        title: '用户名',
        dataIndex: 'username',
        width:"20%"
       
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        width:"20%"
      },
      {
        title: '电话',
        dataIndex: 'phone',
        width:"15%"
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        render(create_time){
         return dates(new Date(create_time))
          },
        align:"center",
        width:"15%"
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        render:(role_id)=>this.roleName[role_id],
        align:"center",
        width:"10%"
      },
      {
        title: '操作',
        align:"center",
        width:"20%",
        render:(user)=>(
          <span>
             <LinkButton onClick={()=>this.showUpdate(user)} >修改</LinkButton>
              <LinkButton onClick={()=>this.deleteUser(user)}>删除</LinkButton>
          </span>
         
        ),
       
      },
    ]
    
    return (
      <Card title={title}>
      <Table dataSource={users} rowKey="_id"
      columns={columns} bordered pagination={{defaultPageSize:3}}
      />
      <Modal title={user  ?"修改用户":"添加用户"}  destroyOnClose open={isShow} 
      onOk={this.handleOk} onCancel={()=>this.setState({isShow:false})}>
       <UserForm setForm={(form)=>{this.form=form}}
       roles={roles}user={user}
       />
      </Modal>
    </Card>
    )
  }
}
