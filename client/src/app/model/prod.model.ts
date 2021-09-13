import CategoryModel from "./category.model";

export default interface ProdModel{
    // filter: any;
    id:string,
    product_name:string,
    price:string,
    img:string,
    category_id: CategoryModel
}