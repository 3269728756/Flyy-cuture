import '@wangeditor/editor/dist/css/style.css' // 引入 css
import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { Form} from  'antd'
function MyEditor(props) {
    const [editor, setEditor] = useState(null)
    // 从props中取出父组件传递的数据
    const {detail,params}=props
    // 编辑器内容
    const [html, setHtml] = useState('<p></p>')

    // 模拟 ajax 请求，异步设置 html
    useEffect(() => {
        setTimeout(() => {
            setHtml('')
        }, 1500)
        
    }, [])

    // 工具栏配置
const toolbarConfig = { }                        // JS 语法
const handleClick = (editor) => {
    // 传递数据给父组件
    props.click(editor)
    return setHtml(editor.getHtml())
}
const editorConfig= {
    placeholder: "请输入内容...",
    //插入图片
    MENU_CONF: {},
}
// 自定义上传图片
  editorConfig.MENU_CONF['uploadImage'] = {
    // 上传路径
    server:"/manage/img/upload",
    // 自定义上传的方法
   customUpload(file, insertFn) {                   
            const image=  file.name
            // 上传参数
            const url="	http://localhost:5000/upload/"+image
            insertFn(url)
        }
}
// 自定义上传视频
editorConfig.MENU_CONF['uploadVideo'] = {
    // 上传路径
    server:"/manage/img/upload",
    // 自定义上传
    customUpload(file, insertFn) {                 
             const image=  file.name
            //  上传参数
             const url="	http://localhost:5000/upload/"+image
             insertFn(url)
         }
}
// 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editor])
  
    return (
    <Form.Item label="商品详情"
       labelCol={{span:2}} wrapperCol={{span:21}}
       >
        <div style={{ border: '1px solid #ccc', zIndex: 100}}>
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />
             
                <Editor
                    defaultConfig={editorConfig}
                    value={params.id?detail:html}
                    onCreated={setEditor}
                    onChange={handleClick}
                    mode="default"
                    style={{ overflowY: 'hidden',minHeight:"500px",height:"600px"}}
                />
            </div>
        </Form.Item>
        )
}


export default MyEditor