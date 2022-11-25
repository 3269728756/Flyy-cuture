import React from 'react'
import {Routes,Route,Navigate} from "react-router-dom"
import ShopDetail from './ShopDetail'
import ShopHome from './ShopHome'
import ShopUpdate from './ShopUpdate'
import  "./css/detail.css"

export default function Shop() {
    
  return (
        <Routes>
        <Route path="/"  element={<ShopHome/>}></Route>
        <Route path="shopdetail/:id"  element={<ShopDetail/>}></Route>
        <Route path="shopupdate/:id"  element={<ShopUpdate/>} exact></Route>
        <Route path="shopupdate"  element={<ShopUpdate/>} ></Route>
        <Route path="/" element={<Navigate to="/" />} />
      </Routes>
    )
}