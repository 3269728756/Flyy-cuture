import store from "store"
const USER_KEY="user_key"
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    saveUser(user){
        // 因为LocalStorage不能兼容较低版本的浏览器，所以用store库较为方便
        // localStorage.setItem(USER_KEY,JSON.stringify(user))
        store.set(USER_KEY,user)
    },
    getUser(){
        // return JSON.parse(localStorage.getItem(USER_KEY)||"{}")
        return store.get(USER_KEY)||{}
    },
removeUser(){
    store.remove(USER_KEY)
    // localStorage.removeItem(USER_KEY)
}
}