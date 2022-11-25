import React, { Component } from 'react'
import { Card,Button, Select,Input,Table, message } from 'antd';
import {PlusOutlined,SearchOutlined } from "@ant-design/icons"
import {reqProducts,reqUpdateStatus,reqSearchProducts} from "../../Api/index"
import withRouter from "../../config/withRouter"
const {Option}=Select;

 class ShopHome extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      products:[],//当前页的产品集合
      total:"",//所有产品总数
      current:"1",//当前展示的页数
      keyWord:"",//搜索的关键字
      searchType:"productName "
    }
}
// 点击搜索按钮调用该函数进行搜索
search= async ()=>{
  this.isSearch=true
  this.getProducePage()
   }
//  创建用于商品分页列表的函数
  getProducePage= async(number=1)=>{
    let result;
    // 若为搜索
    if(this.isSearch){
      // 从状态中拿出一下数据，其中keyWord已经在下边动态输入
      const {keyWord,searchType}=this.state
      // 用于搜索商品分页的接口函数
       result= await reqSearchProducts(number,3,searchType,keyWord)

    }else{
      // 用于商品分页的接口函数
       result=await reqProducts(number,3)
    }
    // 从返回的接口结果中取出一下数据
    const {status,data}=result
    if(status===0){
      this.setState({
        products:data.list,
        total:data.total,
        current:data.pageNum
      })
    }
}
  // 更新状态的函数
  getprostatus=async ({_id,status})=>{
    // 当前页的所有商品列表
    let products=[...this.state.products]
    if(status===1) status=2
    else status=1
    const result= await reqUpdateStatus(_id,status)
    if(result.status===0){
      message.success("更新状态成功")
      products=products.map((item)=>{
        if(item._id===_id){
          item.status=status
        }
        return item
      })
      this.setState({products:products})
    }else{
      message.error("更新状态失败")
    }
  }
 
  componentDidMount(){
    // 在页面初始加载时展现
    this.getProducePage()
  }
  change=(item)=>{
    // 路由跳转到该页面，通过模板字符串进行传参
    this.props.naviagte(`shopupdate/${item._id}`)
    // 将item数据传给更新组件
    localStorage.setItem('parss', JSON.stringify({item}))
  }
  detail=(item)=>{
    sessionStorage.setItem('par', JSON.stringify(item))
    this.props.naviagte(`shopdetail/${item._id}`)
   }
  
  render() {
    
    const dataSource = this.state.products
    const columns = [
      {
        title: '商品名称',
        width:"20%",
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '商品描述',
        width:"50%",
        dataIndex: 'desc',
        key: 'desc',
      },
      {
        title: '价格',
        align:"center",
        dataIndex: 'price',
        key: 'price',
        render:price=>"￥"+price
       
      },
      {
        title: '状态',
        // dataIndex: 'status',
        align:"center",
        key: 'status',
        render:(item)=>{
      

          return (
            <div>
              <Button type={item.status===1?"danger":"primary"}
              onClick={()=>{this.getprostatus(item)}}
              >{item.status===1?"下架":"上架"}</Button><br/>
              <span>{item.status===1?"在售":"停售"}</span>
              </div>
            )}},
      {
        title: '操作',
        // dataIndex: 'oper',
        align:"center",
        key: 'oper',
        render:(item)=>{
          return (<div>
            
          
            <Button type="link" onClick={()=>this.detail(item)}>详情</Button><br/>
            
             <Button type="link" onClick={()=>this.change(item)}>修改</Button>
            </div>)
        }

      },
          ];
    return (
      <div>
         <Card
        title={
        <div>
              <Select value="productName " style={{width:"150px"}} 
                onChange={(value)=>{this.setState({searchType:value})}}
              >
              <Option value="productName ">按名称搜索</Option>
              <Option value="shoe">按描述搜索</Option>
              </Select>
              <Input placeholder='请输入关键字' style={{width:"200px",margin:"0 10px"}} allowClear
              onChange={(event)=>{this.setState({keyWord:event.target.value})}}
              / >
              <Button type="primary"
              onClick={this.search}
               ><SearchOutlined />搜索</Button>

        </div>
        }
      
      extra={<Button type="primary"  onClick={()=>{this.props.naviagte("shopupdate")}}>
            <PlusOutlined/>
            添加
            </Button>}
      
    >
    <Table 
    dataSource={dataSource} 
    columns={columns} bordered
    rowKey="_id"
    pagination={{total:this.state.total,
                  pageSize:3,
                  current:this.state.current,
                  onChange:this.getProducePage}}
    />
    </Card>
      </div>
    )
  }
}
export default(withRouter(ShopHome))





