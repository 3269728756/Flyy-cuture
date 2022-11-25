import {combineReducers} from "redux"
import productRecuder from "./product_recuder"

export default combineReducers({
    products:productRecuder
})