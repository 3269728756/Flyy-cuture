import React,{useState} from 'react'
import {Tree,Form,Input, } from 'antd';
import menuList from "../../config/menuConfig"
const Item=Form.Item


export default function UpRole(props) {
  // 从父组件传递的数据中取出name和menus
   const name=props.role.name
   const menus=props.role.menus
  //  将menus作为初始权限以便进行更新
   const [checkeKeys,setState]=useState(menus)
    const getTreeNodes=(menuList)=>{
    // eslint-disable-next-line array-callback-return
    return menuList.reduce((pre,item)=>{
        // 将得到的权限展示进权限列表
        pre.push({
            title: item.title,
            key: item.key,
            children:item.children?getTreeNodes(item.children):null
        })
        return pre
    },[])
   
  }
   
   const treeData = [
    {
      title: '平台权限',
      key: '0-0-1',
      // 将得到的权限信息作为其children属性挂载
      children: getTreeNodes(menuList)
    }
       ];
  const onCheck = (checkeKeys, info) => {
    // 更新权限列表
    setState(checkeKeys)
   
  };
  // 将权限列表传递到内存中，以便其他组件读取
  sessionStorage.setItem('par', JSON.stringify({checkeKeys}))

  return (
    <Form>
      <Item label="角色名称">
      <Input value={name}disabledstyle={{width:"80%"}}/>
      <Tree checkable defaultExpandedKeys={['0-0-1','/products',"/charts"]} 
      checkedKeys={checkeKeys} onCheck={onCheck} treeData={treeData} />
  </Item>
</Form>
  )
}
