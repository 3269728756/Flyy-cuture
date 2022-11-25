import React,{Component} from 'react'
import {Card,Button,Table,Modal, message} from "antd"
import {reqRoles,reqAddRole,reqUpdateRole} from "../../Api/index"
import AddRole from "../role/addRole"
import UpRole from "../role/upRole"
import memory from "../../utils/memory"
import dates from "../../utils/Date"

export default class Role extends Component {
  state={
    role:{},
    roles:[],
    modalOpen:false,
    upOpen:false,
  }
  constructor(props){
    super(props)
    this.auth=React.createRef()
  }
  // 获取并设置用户列表
  getRow= async()=>{
    const result= await reqRoles()
    if(result.status===0){
      const roles=result.data
    //  更新当前用户列表
      this.setState({roles:roles})
    }
  }
  componentDidMount(){
    this.getRow()
  }
  onRow=(role)=>{
    return {
      onClick:event=>{
        this.setState({role})
      }
    }
  }
// 添加角色
 handleOk = async() => {
  // 获取动态输入的角色名
  const rolName=this.form.getFieldValue().sname
  const result= await reqAddRole(rolName)
  this.form.resetFields()
  if(result.status===0){
    // 得到新创建的角色
    const role=result.data
    this.setState(state=>({
      // 将新创建的角色与原来的角色合并，形成新的roles
      roles:[...state.roles,role]
    }))
    message.success("添加角色成功")
  }else{
    message.error("添加角色失败")
  }
  // 关闭Modal框
  this.setState({modalOpen:false});
};
// 更新角色
upOk = async() => {
  // 得到当前需要更新的角色
  const role=this.state.role
  // 关闭Modal框
  this.setState({upOpen:false});
  // 拿到数据
  let age=JSON.parse(sessionStorage.getItem('par'))
  const menus=age.checkeKeys
  role.menus=menus
  // 从保存的内存中取出用户名
  role.auth_name=memory.user.username
  const result=await reqUpdateRole(role)
 if(result.status===0){
  // 更新角色权限
  this.setState({
    roles:this.state.roles
  })
  }
this.getRow()
};

render() {
    const {role,roles,modalOpen,upOpen}=this.state
    const title=(
      <span>
        <Button type="primary" style={{margin:"0 10px"}} onClick={()=> this.setState({modalOpen:true})}>创建角色</Button>
        <Button type="primary" disabled={!role._id} onClick={()=> this.setState({upOpen:true})}>设置角色权限</Button>
      </span>)
    const columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
        width:"15%"
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render(create_time){
          
         return create_time?dates(new Date(create_time)):""
          
        },
        
        width:"32%"
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        render(auth_time){
         return auth_time?dates(new Date(auth_time)):""
          
        },
        
        width:"32%"
      },
      {
        title: '授权人',
        dataIndex: 'auth_name',
        
        width:"15%"
      },
      ];
    
    return (
      <Card title={title}>
      <Table
        rowSelection={{type: "radio",width:"6%",selectedRowKeys:[role._id],
          onSelect:(role)=>{
            this.setState({role})
          }
        }}
        pagination={{defaultPageSize: 5}}
        rowKey='_id'
        columns={columns}
        dataSource={roles}
        bordered
        onRow={this.onRow}
      />
      <Modal title="添加角色" open={modalOpen} onOk={this.handleOk} onCancel={()=>this.setState({modalOpen:false})} destroyOnClose>
        <AddRole
        setForm={(form)=>{this.form=form}}
        />
      </Modal>
      <Modal title="更新角色" open={upOpen} onOk={this.upOk} onCancel={()=>this.setState({upOpen:false})} 
      destroyOnClose
      >
        <UpRole role={role}/>
      </Modal>
   </Card>
    )
  }
}
