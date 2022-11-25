import React,{Component} from 'react'
import { Card,Button,List,Typography } from 'antd';
import "./css/detail.css"
import {reqCategory} from "../../Api/index"
import {ArrowLeftOutlined} from "@ant-design/icons"
import withRouter from "../../config/withRouter"
import {BASE_IMG_URL} from "../../utils/cpublic"
 class ShopDetail extends Component {
  state={
    mess:"",//当前商品的信息
    cName1:"",//一级分类名称
    cName2:""//二级分类名称
  }
  async componentDidMount(){
    // 接收到父组件传递的当前商品的信息
    let item=JSON.parse(sessionStorage.getItem('par'))
    // 接收分类数据，
      if(item._id===this.props.params.id){
        const {categoryId,pCategoryId}=item
        // 无二级分类情况
        if(pCategoryId==="0"){
          const result=await reqCategory(categoryId)
          // 拿到一级分类的名字
          const cName1=result.data.name
          this.setState({cName1})
          
        }else{
          // 有二级分类的情况
          const results= await Promise.all([reqCategory(categoryId),reqCategory(pCategoryId)])
          // 拿到一级分类与二级分类的名字
          const cName1=results[0].data.name
          const cName2=results[1].data.name
          this.setState({cName1,cName2})
        }
        // 更新当前商品的信息
        this.setState({mess:item})
      }
   }
   
  render() {
    // 从状态中取出当前商品的信息以及一二级分类名称
    const {mess,cName1,cName2}=this.state
    const data = [
      <div className='title'><span>商品名称：</span><span>{mess.name}</span> </div>,
      <div className='title'><span>商品描述：</span><span>{mess.desc}</span> </div>,
      <div className='title'><span>商品价格：</span><span>{mess.price}</span> </div>,
      <div className='title'><span>所属分类：</span><span>{cName2?cName2+"-->":""}{cName1}</span> </div>,
      <div className='title'><span>商品图片：</span>
      <span>
        {mess.imgs&&mess.imgs.map(img=>(
         <img 
          key={img}
          src={BASE_IMG_URL+img}
          className="p-img"
          alt="img"
          
          />
        ))}
        </span>
       </div>,
      <div className='title'><span>商品详情：</span><span dangerouslySetInnerHTML={{__html: `<div>${mess.detail}</div>`}}></span></div>
    ]
    return (
      <Card
      title={
        <div>
          <Button style={{fontSize:"18px"}} type="link"
          onClick={()=>{this.props.naviagte(-1)}}>
            <ArrowLeftOutlined  />商品详情</Button>
        </div>
      }>
      <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text mark></Typography.Text> {item}
          </List.Item>
        )}
      />
    </Card>
    )
  }
}

// 利用withRouter包裹租价使得组件可以使用某些方法
export default withRouter(ShopDetail)


 