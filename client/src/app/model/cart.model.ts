import OrderModel from "./order.model";
import UsersModel from "./users.model";

export default interface CartModel{
    id:string,
    date_created:string,
    status:string,
    order_date?: OrderModel,
    final_price?: OrderModel,
    user_id: UsersModel
}