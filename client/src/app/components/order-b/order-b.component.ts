import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogOrderComponent } from '../dialog-order/dialog-order.component';

const moment = _rollupMoment || _moment;

interface City {
  value: string;
}

@Component({
  selector: 'app-order-b',
  templateUrl: './order-b.component.html',
  styleUrls: ['./order-b.component.css'],
})


export class OrderBComponent implements OnInit {

  myFilter = (m: Moment | null): boolean => {
    const day = (m || moment()).day();
    const date = (m || moment()).date();
    const formatedDate = (m || moment()).format('DD-MM-yyyy')
    console.log(formatedDate);
    let blockedDates = []
    for (const blocked of this._data.unavailableDates) {
      let x = moment(Object.values(blocked)[0]).format('DD-MM-yyyy')
      blockedDates.push(x)
    }
    return !blockedDates.find(x=> x == formatedDate) && day !== 6
  }

 getStreet(){
    this.myForm.patchValue({
      shipping_street: this._data.usersStreet
    })
  }

  getCity(){
    this.myForm.patchValue({
      shipping_city: this._data.usersCity
    })
  }

  openDialogOrder() {
    if (this.myForm.valid && this._data.cartId !== 0 ){
      const dialogOrderConfig = new MatDialogConfig();
      dialogOrderConfig.disableClose = true;
     dialogOrderConfig.autoFocus = true;
      this.dialog.open(DialogOrderComponent, dialogOrderConfig);
    }
  }

  minDate = moment()
  maxDate: Date;

  public myForm: FormGroup 

  shipping_date: any;
  street: any = "";
  selectedCity: string;

  cities: City[]= [
    {value: 'Ness-ziona'},
    {value: 'Rehovot'},
    {value: 'Tel-Aviv'},
    {value: 'Haifa'},
    {value: 'Herzliya'},
    {value: 'Jerusalem'} 
  ]

  constructor(
    public _data:DataService,
    public _fb:FormBuilder,
    public _r:Router,
    public dialog: MatDialog
    ) { 
              const currentYear = moment().year()
              const currentMonth = moment().month()
              console.log("today is: ", this.minDate);
              const today = moment().format('DD-MM-yyyy')
              console.log(today);
              this.maxDate = new Date(currentYear, currentMonth+1 , 31);
              console.log(this.maxDate);
    }
    
  ngOnInit(): void {
    // this._data.getOrders(),
    this._data.getUnavailableDates()
    this.myForm = this._fb.group({
      user_id: [this._data.userID],
      cart_id: [this._data.cartId],
      final_price: [this._data.final_price],
      shipping_city: ["", [Validators.required]],
      shipping_street: ["" ,[Validators.required]],
      shipping_date: [ "", Validators.required],
      last_card_digits: ["", [Validators.required, Validators.min(10000000000000), 
        Validators.max(9999999999999999), Validators.pattern("^[0-9]*$")]]
    })

  }

}

