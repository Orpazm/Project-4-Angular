import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";


@Component({
  selector: 'app-dialog-user',
  templateUrl: './dialog-user.component.html',
  styleUrls: ['./dialog-user.component.css']
})
export class DialogUserComponent implements OnInit {

  public form: FormGroup 
  quantity: number;
  product_id: number;
  cart_id: number;
  user_id: string;

  constructor(
    public _data:DataService,
    public _fb:FormBuilder,
    public dialogRef: MatDialogRef <DialogUserComponent>,
        @Inject(MAT_DIALOG_DATA) data
  ) { console.log(data);
  
    this.product_id = data.product_id,
    this.cart_id = _data.cartId,
    this.user_id = data.user_id
  
  }

  ngOnInit(): void {
    this.form= this._fb.group({
      quantity: [[],Validators.required],
      product_id: [this.product_id],
      cart_id: [this.cart_id],
      user_id: [this.user_id]
    })
  }

  close() {
    this.dialogRef.close();
  }

}
