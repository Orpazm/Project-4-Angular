import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import ProdModel from 'src/app/model/prod.model';
import { DataService } from 'src/app/services/data.service';
import { DialogAlertComponent } from '../dialog-alert/dialog-alert.component';
import { DialogUserComponent } from '../dialog-user/dialog-user.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public myForm: FormGroup 

  public category:string = ""

  showFiller = false;
  isToggled = false;
  

  constructor( 
    public _data:DataService,
    public _fb:FormBuilder,
    public _r:Router,
    public dialog: MatDialog,
    ) { }

    OpenEdit(i){
      console.log("edit was clicked");
      console.log("prod ", i, "was clicked");
      this._data.addProdClicked = false
      this._data.isEditClicked = true
    }


    toggleAddForm(){
      this._data.addProdClicked = !this._data.addProdClicked
    }

    openDialog(i) {
      const dialogConfig = new MatDialogConfig();
      console.log(i);
       console.log("product id is: ", this._data.productsArr[i].id);
       console.log("cart id is: ", this._data.cartId);
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
        product_id: this._data.productsArr[i].id,
        cart_id: this._data.cartId,
        user_id: this._data.userID,
    }
      this.dialog.open(DialogUserComponent, dialogConfig);
    }

    openDialogAlert() {
      const dialogAlertConfig = new MatDialogConfig();
      dialogAlertConfig.autoFocus = true;
      this.dialog.open(DialogAlertComponent, dialogAlertConfig);
    }

    setCurrProd(prod:ProdModel){
      this._data.currProduct = prod
    }

  getTab(a){
    console.log("printed");
    console.log(a.tab.textLabel);
    console.log(a);
    const category = this._data.categoryArr.find(category => category.category_name === a.tab.textLabel)
    const id= +category.id
    this._data.getProducts(id)
  }

  ngOnInit(): void {
    this._data.getDecodeToken()
    this._data.getCategories()
    this._data.getCartItems(this._data.userID)
    this._data.getFinalPrice(this._data.userID)
    this._data.getProducts(1)
  }

}

