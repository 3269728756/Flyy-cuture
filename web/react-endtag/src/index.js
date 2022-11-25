import  React  from'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import 'antd/dist/antd.less';
import  memory from "./utils/memory"
import  storge from "./utils/storge"
// 将用户数据保存到内存中
const user=storge.getUser()
if(user && user._id){
  memory.user=user
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


