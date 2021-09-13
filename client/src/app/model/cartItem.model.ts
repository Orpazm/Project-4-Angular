import CartModel from "./cart.model";
import ProdModel from "./prod.model";
import UsersModel from "./users.model";

export default interface CartItemModel{
    id:string,
    quantity:string,
    total_price:string,
    date_created?: Date,
    product_name?:string,
    product_id:ProdModel,
    img: ProdModel,
    cart_id:CartModel,
    user_id:UsersModel
}