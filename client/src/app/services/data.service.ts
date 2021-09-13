import { HttpClient , HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import CartModel from '../model/cart.model';
import CartItemModel from '../model/cartItem.model';
import CategoryModel from '../model/category.model';
import OrderModel from '../model/order.model';
import ProdModel from '../model/prod.model';
import UsersModel from '../model/users.model';


interface orederCountRespose{
  orders:number
}

interface productCountRespose{
  products:number
}

interface blockedDatesRespose{
  blockedDates:Date 
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  tabGroup: any;
  

  constructor(
    public _http:HttpClient,
    public _r:Router
  ) { }

  public user : UsersModel[] = []
  public productsArr : ProdModel[] = []
  public categoryArr : CategoryModel[] = []
  public cartsArr : CartModel[] = []
  public cartItemArr : CartItemModel[] = []
  public ordersArr : OrderModel[] = []
  public orderCount : number = 0
  public productsCount : number = 0
  public unavailableDates: blockedDatesRespose[] = []
  public errMsg : string = ""
  public token: string = localStorage.token
  public decodedToken : Object = {}
  public name : string = Object.values(this.decodedToken)[2]
  public userID : string = Object.values(this.decodedToken)[0]
  public usersCity : string = Object.values(this.decodedToken)[4]
  public role : string = Object.values(this.decodedToken)[3]
  public usersStreet : string = Object.values(this.decodedToken)[5]
  public isRegisteredA : boolean = false
  public ID: string =""
  public order_dates_arr : [] = []
  public order_date: string = ""
  public shippingDate: string =""
  public clicked:boolean = false
  public categoryId:string =""
  public selectedIndex: number = 0;
  public currProduct: ProdModel
  public cartId:number = 0
  public final_price: number = 0
  public isEditClicked = false;
  public addProdClicked = false;
  

  eraseErrorMsg(){
    if(this.errMsg!== ""){
      setTimeout(() => {
        this.errMsg = ""
      }, 4000);
    }
  }

  getDecodeToken(){
    const helper = new JwtHelperService();
     this.decodedToken = helper.decodeToken(localStorage.token);
     this.name = Object.values(this.decodedToken)[2]
     this.userID = Object.values(this.decodedToken)[0]
     this.usersCity = Object.values(this.decodedToken)[4]
     this.usersStreet = Object.values(this.decodedToken)[5]   
     this.role = Object.values(this.decodedToken)[3]

     console.log("role is: ", this.role);
     
  }

  //getting detailes about user's cart/first purchase
  public getCart(id:string){
    this._http.get<CartModel[]>('http://localhost:1000/main/cart/' + id, {
      headers:{
        "authorization":localStorage.token,
        "content-type":"application/json"}
    })
    .subscribe(
      (res)=>{
        this.cartsArr = res
        console.log(res);
      },
      err=>{
        console.log(err); 
      }
    )
  }

  //login to site
  public async login(email:string, password:string){
    try {
     const res = await fetch("http://localhost:1000/auth/login",{
       method:"POST",
       headers:{"content-type":"application/json"},
       body: JSON.stringify({email,password})
   })
   
   const data = await res.json()
   
   if(res.status ==200){
     console.log("res is: ", res);
     localStorage.token = data.token;
     this.getDecodeToken()
     
console.log(this.role);

     if(this.role == "user"){
       this.cartId= data.cart_id[0].cart_id
       console.log(this.cartId);

       this.order_dates_arr = data.order_date
       console.log(this.order_dates_arr);
       for (let i = 0; i < this.order_dates_arr.length; i++) {
         this.order_date = Object.values(this.order_dates_arr)[i]  
       }
  
       console.log(this.order_date);
       console.log(Object.values(this.order_date));
       this.order_date = Object.values(this.order_date)[0];

       this.getCart(this.userID)
       this.getCartItems(this.userID)
       this.getFinalPrice(this.userID)
       console.log("my crts arr is: ", this.cartsArr);
     }else{
      this._r.navigateByUrl('/main')
     }
     console.log("data is: ", data);
     console.log(this.decodedToken);
     console.log(data)
   }else{
     console.log(data.err);
     this.errMsg = data.err
     this.eraseErrorMsg()
   }
    } catch (err) {
      console.log(err);
    }
  }

  //register first part
  public async registerA(id: string, email:string, password:string){
    try {
     const res = await fetch("http://localhost:1000/auth/register",{
       method:"POST",
       headers:{"content-type":"application/json"},
       body: JSON.stringify({id,email,password})
   })
   const data = await res.json()
   if(res.status ==200){
     console.log(data)
     this.isRegisteredA = !this.isRegisteredA
     this.ID= id
   }else{
     console.log(data.err);
     this.errMsg = data.err
     this.eraseErrorMsg()
   }
    } catch (err) {
      console.log(err);
    }
  }

  //register second part
  public async registerB(id:string, city:string, street:string, name: string, surname:string){
    try {
     const res = await fetch("http://localhost:1000/auth/register",{
       method:"PUT",
       headers:{"content-type":"application/json"},
       body: JSON.stringify({id,city,street,name,surname})
   })
   
   const data = await res.json()
   if(res.status ==201){
      console.log(res);
      console.log(data);
      console.log(data.cartId);

     this._r.navigateByUrl('/login')
   }else{
     console.log(data.err);
     this.errMsg = data.err
     this.eraseErrorMsg()
   }
    } catch (err) {
      console.log(err);
    }
  }


  //getting orders 
  // public getOrders(){
  //   this._http.get<OrderModel[]>('http://localhost:1000/order/all',{
  //     headers:{
  //       "authorization":localStorage.token,
  //       "content-type":"application/json"}
  //   })
  //      .subscribe(
  //         (res)=>{
  //           this.ordersArr = res
  //           console.log(res);
  //        },
  //        err=>{
  //          console.log(err);
  //        }
  //      )
  // }

  //getting orders count 
  public getOrdersCount():void {
    this._http.get<orederCountRespose[]>('http://localhost:1000/main/orders')
    .subscribe(
       (res)=>{
         this.orderCount = res[0].orders
         console.log(res);
      },
      err=>{
        console.log(err);
      }
    )
  }

  //getting product count 
  public getProdCount() {
    this._http.get<productCountRespose[]>('http://localhost:1000/main/products')
       .subscribe(
          (res)=>{
            this.productsCount = res[0].products
            console.log(res);
         },
         err=>{
           console.log(err);
         }
       )
  }

  //getting only unavailable dates for shipping
  public getUnavailableDates() {
    this._http.get<blockedDatesRespose[]>('http://localhost:1000/order/blocked',{
      headers:{
        "authorization":localStorage.token,
        "content-type":"application/json"}
    })
    .subscribe(
      (res)=>{
        this.unavailableDates = res
        console.log(res);
        console.log("blocked dates are: ", this.unavailableDates);
      },
      err=>{
        console.log(err);
      }
    )
  }

  //getting all the categories
  public getCategories() {
    this._http.get<CategoryModel[]>('http://localhost:1000/shop/category',{
      headers:{
        "authorization":localStorage.token,
        "content-type":"application/json"}
    })
       .subscribe(
          (res)=>{
            this.categoryArr = res
            console.log(res);
         },
         err=>{
           console.log(err);
         }
       )
  }


  //getting all products
  public getProducts(id:number) {
    this._http.get<ProdModel[]>('http://localhost:1000/shop/products/' +id ,{
      headers:{
        "authorization":localStorage.token,
        "content-type":"application/json"}
    })
       .subscribe(
          (res)=>{
            this.productsArr = res
            console.log(res);
         },
         err=>{
           console.log(err);
         }
       )
  }

  //getting searched products
  public getSearchedProducts(prod:string) {
    this._http.get<ProdModel[]>('http://localhost:1000/shop/searched/' + prod , {
      headers:{
        "authorization": localStorage.token,
        "content-type":"application/json"
      }
    })
    .subscribe(
      (res)=>{
        this.productsArr = res
        console.log(res);
      },
      err=>{
        console.log(err);
      }
    )
  }

  //adding to cart
  public addToCart(body:{product_id:number, quantity:number, cart_id:number, user_id:string}){
    this._http.post<CartItemModel[]>('http://localhost:1000/shop', body,  {
      headers: {
        "authorization":localStorage.token,
        'content-type': 'application/json'}
    })
    .subscribe(
      (res)=>{
        //update the array
        this.cartItemArr = res
        console.log(this.cartItemArr);
        this.getFinalPrice(this.userID)
        
        // this.getOrders()
        // this._r.navigateByUrl("/")
     },
     err=>{
       console.log(err);
     }
   )
  }

  //posting order detailes
  public makeOrder(body:{user_id:string, cart_id:number, final_price:number, shipping_city:string,
                         shipping_street:string, shipping_date:string, last_card_digits:number}){
    this._http.post<OrderModel[]>('http://localhost:1000/order', body,  {
      headers: {
        "authorization":localStorage.token,
        'content-type': 'application/json'}
    })
    .subscribe(
      (res)=>{
        //update the array
        this.ordersArr = res
        this.cartId= res[2].insertId
        this.shippingDate = res[0].shipping_date
        console.log(this.ordersArr);
        console.log(res);
        
        console.log(res[0]);
        console.log(res[1]);
        console.log(res[1].insertId);
        console.log("shipping date is: ", this.shippingDate);
        console.log("new cart id is: ", this.cartId);
        

        
        
        // this.getOrders()
        // this._r.navigateByUrl("/")
     },
     err=>{
       console.log(err);
       this.errMsg = err.error.err
       this.eraseErrorMsg()
     }
   )
  }

  
  //showing the user his cart items
  public getCartItems(id:string) {
    this._http.get<CartItemModel[]>('http://localhost:1000/shop/cartitems/' +id,{
      headers:{
        "authorization":localStorage.token,
        "content-type":"application/json"}
    })
       .subscribe(
          (res)=>{
            this.cartItemArr = res
            console.log("my cart items are: ",res);
         },
         err=>{
           console.log(err);
         }
       )
  }

  //showing the user his final price 
  public getFinalPrice(id:string):void {
    this._http.get('http://localhost:1000/shop/finalPrice/' +id,{
      headers:{
        "authorization":localStorage.token,
        "content-type":"application/json"}
    })
       .subscribe(
          (res)=>{
            console.log(res);
            
            console.log((res)[0].finalPice)
            this.final_price = res[0].finalPice
            console.log("my final price is: ",this.final_price);
            console.log("user id is: ", this.userID);
         },
         err=>{
           console.log(err);
         }
       )
  }

    //deleting an item from cart
    public delCartItem(id: string) {
      this._http.delete<CartItemModel[]>('http://localhost:1000/shop/' +id ,{
        headers:{
          "authorization":localStorage.token,
          "content-type":"application/json"}
      })
         .subscribe(
            (res)=>{
              this.cartItemArr = res
              console.log("my cart items now are: ",res);
           },
           err=>{
             console.log(err);
           }
         )
    }

        //deleting all cart items 
        public delAllCartItems(id: number) {
          console.log("id all is: ",id);
          
          this._http.delete<CartItemModel[]>('http://localhost:1000/shop/all/' +id ,{
            headers:{
              "authorization":localStorage.token,
              "content-type":"application/json"}
          })
             .subscribe(
                (res)=>{
                  this.cartItemArr = res
                  console.log("my cart items now are: ",res);
               },
               err=>{
                 console.log(err);
               }
             )
        }

//admin changing products
public changeItem(body:{ product_name:string, category_id:number, price:number, img:string}) {
  this._http.put<ProdModel[]>('http://localhost:1000/shop/change', body ,{
    headers:{
      "authorization":localStorage.token,
      "content-type":"application/json"}
  })
     .subscribe(
        (res)=>{
          this.productsArr = res
          console.log("products changed ",res);
       },
       err=>{
         console.log(err);
       }
     )
}

//admin adding products
public addItem(body:{ product_name:string, category_id:number, price:number, img:string}) {
  this._http.post<ProdModel[]>('http://localhost:1000/shop/add', body ,{
    headers:{
      "authorization":localStorage.token,
      "content-type":"application/json"}
  })
     .subscribe(
        (res)=>{
          this.productsArr = res
          console.log("product added ",res);
         
          this.getProducts( +Object.values(body)[1])
          this.addProdClicked = false
       },
       err=>{
         console.log(err);
         this.errMsg = err.error.err
         this.eraseErrorMsg()
       }
     )
}


isLoggedIn():Boolean{
  return !!localStorage.token
 }

}
// function jwt_decode(token: any) {
//   throw new Error('Function not implemented.');
// }

