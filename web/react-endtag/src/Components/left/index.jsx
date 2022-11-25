// eslint-disable-next-line no-unused-vars
import React, {useState,Component,useEffect } from 'react'
import logo from "../../access/images/logo192.png"
import "./css/index.css"
import {Layout,  Menu} from 'antd';
import {Link,NavLink,useLocation} from "react-router-dom"
import {
    AppstoreOutlined,
    HomeOutlined, 
    UnorderedListOutlined,
    ToolOutlined,
    UserOutlined,
    SafetyOutlined,
    AreaChartOutlined,
    BarChartOutlined,
    LineChartOutlined,
    PieChartOutlined,
    WindowsOutlined
  } from '@ant-design/icons';
import memoryUtils from '../../utils/memory';
 const {Sider}=Layout;

//  用于创建左侧列表的函数
function getItem(label, key,icon,children,type) {
    return {
      key,
      icon,
      label,
      children,
      type,
    };
  }
  const Left=()=> {
    const items = [
      getItem(<Link to="/home">首页</Link>, '/home', <HomeOutlined />),
      getItem('商品','/products', <AppstoreOutlined />, 
        [
          getItem(<Link to="/products/category">品类管理</Link>, '/products/category',<UnorderedListOutlined/>),
          getItem(<NavLink to="/products/product">商品管理</NavLink>, '/products/product',<ToolOutlined />),
        
        ]),
      getItem(<Link to="/user">用户管理</Link>, '/user', <UserOutlined />),
      getItem(<Link to="/role">角色管理</Link>, '/role', <SafetyOutlined />),
      getItem('图形图表', '/charts',<AreaChartOutlined />,
       [
          getItem(<NavLink to="/charts/bar">柱形图</NavLink>, '/charts/bar',<BarChartOutlined />),
          getItem(<NavLink to="/charts/line">折线图</NavLink>, '/charts/line',<LineChartOutlined />),
          getItem(<NavLink to="/charts/pie">饼形图</NavLink>, '/charts/pie',<PieChartOutlined />),
         
        ]),
      getItem(<Link to="/order">订单管理</Link>, '/order', <WindowsOutlined />),
      ];
      // 获取用户登录权限的路由地址
      const menus=memoryUtils.user.role.menus
      // 获取用户的用户名
      const username=memoryUtils.user.username
      const location=useLocation()
      // 得到当前用户点击的路由地址
      const path=location.pathname
      const arr1= items.filter(v => !menus.includes(v.key))
      // eslint-disable-next-line array-callback-return
      // 根据menus设置用户登陆权限
      for(let i=1;i<items.length;i++){
      for(let j=0;j<arr1.length;j++){
        // 当用户名为admin且有权限时
         if(arr1[j]===items[i]&&username!=="admin"&&menus.length!==0){
            items[i]=""
          }
          // 当用户名为admin且无权限时
          else if(menus.length===0&&username!=="admin"){
          items[i]=""
  
        }
      }
    }
    // 设置菜单被选中以及二级菜单的展开
  const arr=path.split("/").splice(1)
  const defult=[path, "/"+arr[0]+"/"+arr[1]]
     return (
        <div className='left'>
        <div className='left-header'>
           <img src={logo} alt="" />
            <h1>飞佑文化</h1>
        </div>
       
       <div style={{width:"100%",}} >
        <Sider collapsed={false} >
       <Menu
        defaultSelectedKeys={[location.pathname]}
        selectedKeys={defult}
        defaultOpenKeys={["/"+arr[0]]}
        mode="inline"
        theme="dark"
        items={items}
       /> 
    </Sider>
      
  </div>
           
</div>
)}
 export default Left
  
  
  
  
  


