import { useLocation, useNavigate, useParams } from "react-router-dom"
 
// 封装高阶组件
export default function withRouter(WrapperComponent) {
  return function(props) {
    const location = useLocation()
   
    // 在函数组件中通过hook拿到navigate对象
    const naviagte = useNavigate()
    const params=useParams()
    // 将获取到的navigate放到一个对象中
    // const router = {naviagte}
 
    return <WrapperComponent {...props} location={location} naviagte={naviagte} params={params} />
  }
}