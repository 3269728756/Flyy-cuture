/* eslint-disable no-unused-vars */
import React, {useState,useEffect} from 'react'
import  "./css/index.css"
import memory from "../../utils/memory"
import {useLocation,useNavigate} from "react-router-dom"
import  menuList from "../../config/menuConfig"
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {Modal} from 'antd';
import storge from "../../utils/storge"
import LinkButton from '../linkButton/LinkButton'
import {reqWeather} from "../../Api/index"
import dates from "../../utils/Date"


const  Header=() =>{
  // 得到路由跳转函数
  const navigate=useNavigate()
  //  动态渲染时间
  let date = new Date()
  const [count, setCount] = useState(date);
  const [weather, setWeath] = useState("");
  const [province, setPro] = useState("");
  const [temperatur, setTemp] = useState("");
  const [city, setCity] = useState("");
  
  // 展示天气的函数
 const getWeather=async()=>{
  const {weather,temperature,province,city,week}=await reqWeather("611002")
    setTemp(temperature)
    setCity(city)
    setPro(province)
    setWeath(weather)
    
    
  }
// 动态渲染时间
setInterval(() => {
  setCount(count+1)
},1000);
  useEffect( () => {
     getWeather()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

    // 动态渲染用户名
  const username=memory.user.username
  // 动态渲染title
    const location=useLocation()
    const path=location.pathname
    const arr=path.split("/").splice(1)
    // console.log(arr)
    const defult="/"+arr[0]+"/"+arr[1]
   
    var title;
    menuList.forEach(item=>{
      // 根据路由路径的改变动态渲染title
      if(item.key===path){
        title=item.title
      }else if(item.children){
      // eslint-disable-next-line array-callback-return
        item.children.map(itemc=>{
          if(itemc.key===defult){
                title=itemc.title
                 }
          })
        }
      })
      
      // 设置动态退出当前账号
      const confirm = () => {
        Modal.confirm({
          title: '确认退出当前账号吗？',
          icon: <ExclamationCircleOutlined />,
          okText:"确认",
          color:"red",
          onOk(){
            // 清空内存中的用户数据
            memory.user={}
            storge.removeUser()
            // 跳转到登陆界面
            navigate("/login")
          },
          cancelText: '取消',
        });
      };
    
  return (
    <div className='header'>
    <div className="header-top">
      <span>欢迎,{username}</span>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <LinkButton onClick={confirm} >退出</LinkButton>
     </div>
    <div className="header-bottom">
      <div className="header-bottom-left">
      <h1>{title}</h1>
      </div>
      <div className="header-bottom-right">
      <span>{dates(date)}</span>
      <span>{province}-{city}</span>
      <span>{temperatur}℃</span>
      <span>{weather}</span>
      </div>
      

    </div>
  </div>
  )
}
export default Header
