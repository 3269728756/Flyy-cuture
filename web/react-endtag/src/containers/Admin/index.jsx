import React, { Component } from 'react'
import memory from "../../utils/memory"
import {Navigate,Routes,Route,} from "react-router-dom"
import { Layout } from 'antd';
import "./css/index.css"
import Header from "../../Components/header"
import Left from "../../Components/left"
import Home from "../home/Home"
import Category from '../category/Category'
import Shop from '../shop/Shop'
import Order from '../order/Order'
import Role from '../role/Role'
import User from '../user/User'
import Bar from '../charts/Bar'
import Line from '../charts/Line'
import Pie from '../charts/Pie'
import NotFound from "../not-found/not-found"

const {Footer, Sider, Content } = Layout;
export default class Admin extends Component {
  
  render() {
    // 从内存中取出user信息做判断
    const user=memory.user
    // 判断内存中是否有user
    if(!user._id){
      return <Navigate to="/login"/>
    }
    return (
      
  <Layout style={{minHeight:"100%"}}>
      <Sider ><Left/></Sider>
      <Layout style={{overflow:"scroll"}}>
        <div><Header/></div>
        <Content style={{margin:"10px 8px 0 20px",backgroundColor: '#fff',}}>
          
        <Routes>
        <Route  path="" exact element={<Navigate to="/home"  />}/>
        <Route path="/home"  element={<Home/>}></Route>
        <Route path="/products/category"  element={<Category/>}></Route>
        <Route path="/products/product/*"  element={<Shop/>} ></Route>
        <Route path="/role"  element={<Role/>}></Route>
        <Route path="/user"  element={<User/>}></Route>
        <Route path="/charts/bar"  element={<Bar/>}></Route>
        <Route path="/charts/line"  element={<Line/>}></Route>
        <Route path="/charts/pie"  element={<Pie/>}></Route>
        <Route path="/order"  element={<Order/>}></Route>
        <Route path="*" element={<NotFound/>}/>
        </Routes>
     
      </Content>
        <Footer >推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
      </Layout>
      </Layout>
    
       
       
    )
  }
}

