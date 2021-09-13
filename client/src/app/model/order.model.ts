import CartModel from "./cart.model";
import UsersModel from "./users.model";

export default interface OrderModel{
    insertId: number;
    _id: string,
    final_price:string,
    shipping_city:string,
    shipping_street:string,
    shipping_date:string,
    order_date:string,
    last_card_digits:string,
    user_id:UsersModel,
    cart_id:CartModel
}