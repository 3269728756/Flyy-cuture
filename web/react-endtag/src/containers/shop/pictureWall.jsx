import React,{useState} from 'react'
import { Form, message, Modal,Upload } from 'antd';
import { PlusOutlined, } from '@ant-design/icons';
import {reqDeleteImg} from "../../Api/index"
import {BASE_IMG_URL} from "../../utils/cpublic"
import { useEffect } from 'react';


const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
export default function PictureWall(props) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  // 从props中读取父组件传过来的图片数组
  const {imgs}=props
  // 遍历图片数组，以为每个托盘设置属性
  const pictures=imgs?imgs.map((img,index)=>({
    uid:-index,
    name:img,
    status:"done",
    url:BASE_IMG_URL+img
  })):[]
  
   useEffect(()=>{
    setFileList(pictures)
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[])

// file:当前操作的图片
// filelist:所有已上传图片数组
// 图片上传与删除的参数
  const handleChange = async({file,fileList}) =>{
    // 图片上传
    if(file.status==="done"){
      // 从服务器端获取属性
      const result= file.response
      if(result.status===0){
        message.success("图片上传成功")
        const {name,url}=result.data
      // 新添加图片的name和url
        fileList[fileList.length-1].name=name
        fileList[fileList.length-1].url=url
     }else{
      message.error("失败")
     }
    }
    // 删除图片
    else if(file.status==="removed"){
      const result=await reqDeleteImg(file.name)
      if(result.status===0){
        message.success("删除图片成功")
      }else{
        message.error("删除图片失败")
      }
    }
    // 更新现有图片的数组，以便将其重新展示在页面中
    setFileList(fileList);
  } 
  
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{marginTop: 8,}}>
        Upload
      </div>
    </div>
  );
  return (
    <Form.Item
    initialValue={fileList}
    label="商品图片"
    rules={[
          {
            required: true,
          },
        ]}>

      <Form.Item name="imgs">
      <Upload
            action="/api/manage/img/upload"//图片的地址
            acceppt="image/*"//只能上传图片文件
            listType="picture-card"//上传图片的类型
            name="image"
            fileList={fileList}//所有已上传图片的数组
            onPreview={handlePreview}
            onChange={handleChange}>
            {fileList.length >= 6 ? null : uploadButton}
        </Upload>
      </Form.Item>
       
        <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example"style={{width: '100%',}}className="picture"src={previewImage}/>
        </Modal>
  </Form.Item>
  )
}
