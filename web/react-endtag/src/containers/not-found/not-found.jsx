import React, {Component} from 'react'
import {Button, Row, Col} from 'antd'
import  withRouter from "../../config/withRouter"
import './not-found.css'
/*
前台404页面
 */
 class NotFound extends Component {
  
  render() {
   
    return (

      <Row className='not-found'>
        <Col span={12} className='left'></Col>
        <Col span={12} className='right'>
          <h1>404</h1>
          <h2>抱歉，你访问的页面不存在</h2>
          <div>
            <Button type='primary' onClick={() =>  this.props.naviagte('/home')}>
              回到首页
            </Button>
          </div>
        </Col>
      </Row>
    )
  }
}
export default withRouter(NotFound)