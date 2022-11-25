
import React, { Component } from 'react'
import   {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from "./containers/Login/index"
import Admin from "./containers/Admin/index"


export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <Routes>
        <Route path="/Login"  element={<Login/>}></Route>
        <Route path="/*"  element={<Admin/>}></Route>
      </Routes>
      </BrowserRouter>
    )
  }
}

